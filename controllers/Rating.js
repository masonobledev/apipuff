const express = require("express");
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const { Cigar, User } = require("../models");

/**Create post =============================================================================*/

