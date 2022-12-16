import fs from "fs";
import util from "util";
//Delete images in upload file ones its uploaded in cloudinary.
export const unlinkFile = util.promisify(fs.unlink);
