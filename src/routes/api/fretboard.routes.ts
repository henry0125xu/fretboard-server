import { Router } from "express";
import { FretboardController } from "../../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the fretboard
 *     tags:
 *       - Fretboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved fretboard
 */
routes.get("/", (req, res, next) => controller.getFretboard(req, res, next));

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reset the fretboard
 *     tags:
 *       - Fretboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully reset fretboard
 */
routes.post("/reset", (req, res, next) =>
  controller.resetFretboard(req, res, next)
);

/**
 * @swagger
 * /strings/{stringId}:
 *   post:
 *     summary: Insert a string
 *     tags:
 *       - Fretboard
 *     parameters:
 *       - in: path
 *         name: stringId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openString:
 *                 type: string
 *                 example: "E4"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully inserted string
 */
routes.post("/strings/:stringId", (req, res, next) =>
  controller.insertString(req, res, next)
);

/**
 * @swagger
 * /strings/{stringId}:
 *   delete:
 *     summary: Delete a string
 *     tags:
 *       - Fretboard
 *     parameters:
 *       - in: path
 *         name: stringId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted string
 */
routes.delete("/strings/:stringId", (req, res, next) =>
  controller.deleteString(req, res, next)
);

/**
 * @swagger
 * /strings/{stringId}/open-string:
 *   put:
 *     summary: Update open string
 *     tags:
 *       - Fretboard
 *     parameters:
 *       - in: path
 *         name: stringId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openString:
 *                 type: string
 *                 example: "E4"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated open string
 */
routes.put("/strings/:stringId/open-string", (req, res, next) =>
  controller.updateOpenString(req, res, next)
);

/**
 * @swagger
 * /num-frets:
 *   put:
 *     summary: Update number of frets
 *     tags:
 *       - Fretboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numFrets:
 *                 type: number
 *                 example: 22
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated number of frets
 */
routes.put("/num-frets", (req, res, next) =>
  controller.updateNumFrets(req, res, next)
);

/**
 * @swagger
 * /press-notes:
 *   post:
 *     summary: Press notes on the fretboard
 *     tags:
 *       - Fretboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["C", "E", "G"]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully pressed notes
 */
routes.post("/press-notes", (req, res, next) =>
  controller.pressNotes(req, res, next)
);

export default routes;
