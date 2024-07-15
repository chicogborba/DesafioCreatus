"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const awsController_1 = require("../controller/awsController");
const router = (0, express_1.Router)();
router.get('/s3-link', awsController_1.getS3SignedUrl);
exports.default = router;
