import express, { Request, QueryString } from "express";
import logger from "morgan";
export const router = express.Router();

const ipRegex = new RegExp(
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
);

/**
 * @api {get} /getLocation Request location information
 * @apiName GetLocation
 * @apiGroup api
 *
 * @apiParam {String} ip IP address.
 *
 * @apiSuccess {Object} location Location information.
 * @apiError {string} Error Description.
 */

router.get(
  "/getLocation",
  async (
    req: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>,
    res,
  ) => {
    try {

      let ip = req.query.get("ip");

      if (ip == null || ip === "") {
        const clientIp =
          req.headers["x-forwarded-for"] ??
          /* istanbul ignore next */
          req.socket.remoteAddress?.split(":").pop();
        if (!clientIp) {
          res.status(400).send("Unable to determine client IP address");
          return;
        }
        /* istanbul ignore next */
        ip = Array.isArray(clientIp) ? clientIp[0] : clientIp.split(",")[0];
      }
      if (!ipRegex.test(ip)) {
        res.status(400).send("Invalid IP address");
        return;
      }
      const loc = await fetch(`http://ip-api.com/json/${ip}`);
      if (!loc.ok) {
        throw new Error("Failed to fetch location data");
      }
      const jsonLocation = await loc.json();
      res.send(JSON.stringify(jsonLocation));
    } catch (error: any) {
      console.log(error)
      res.status(500).send("Internal Server Error");
      logger(error.toString());
    }
  },
);

export default router;
