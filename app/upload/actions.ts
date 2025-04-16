"use server"

import { ImageAnnotatorClient } from "@google-cloud/vision"
import OpenAI from "openai"

export async function file(formData: FormData) {
  const file = formData.get("file") as File
  console.log("File name:", file.name, "| File size:", file.size)

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const textResult = await analyzeImage(buffer)

    const openai = new OpenAI()

    const response = await openai.responses.create({
      // model: "gpt-4o-mini-2024-07-18",
      // model: "gpt-4o-mini-2024-07-18",
      model: "gpt-4.1-mini-2025-04-14",
      input: [
        {
          role: "system",
          content:
            "You are extracting League of Legends post-game stats from an OCR reading. You must be careful to not include champion names in the players' usernames. Usernames will not include the name of a champion from League of Legends. If the text contains the name of a champion from League of Legends, it is the champion name, not the username.",
        },
        {
          role: "user",
          content: textResult.rowTexts.join("\n"),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "lobby",
          schema: {
            type: "object",
            properties: {
              winning_team: {
                type: "integer",
                enum: [1, 2],
              },
              team_1_kills: {
                type: "integer",
              },
              team_1_deaths: {
                type: "integer",
              },
              team_1_assists: {
                type: "integer",
              },
              team_1_gold: {
                type: "integer",
              },
              team_2_kills: {
                type: "integer",
              },
              team_2_deaths: {
                type: "integer",
              },
              team_2_assists: {
                type: "integer",
              },
              team_2_gold: {
                type: "integer",
              },
              players: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    team: {
                      type: "integer",
                      enum: [1, 2],
                    },
                    champion: {
                      type: "string",
                    },
                    level: {
                      type: "integer",
                    },
                    kills: {
                      type: "integer",
                    },
                    deaths: {
                      type: "integer",
                    },
                    assists: {
                      type: "integer",
                    },
                    damage: {
                      type: "integer",
                    },
                    gold: {
                      type: "integer",
                    },
                    gold_per_minute: {
                      type: "integer",
                    },
                  },
                  required: [
                    "username",
                    "team",
                    "champion",
                    "level",
                    "kills",
                    "deaths",
                    "assists",
                    "damage",
                    "gold",
                    "gold_per_minute",
                  ],
                  additionalProperties: false,
                },
                additionalProperties: false,
              },
            },
            required: [
              "winning_team",
              "team_1_kills",
              "team_1_deaths",
              "team_1_assists",
              "team_1_gold",
              "team_2_kills",
              "team_2_deaths",
              "team_2_assists",
              "team_2_gold",
              "players",
            ],
            additionalProperties: false,
          },
        },
      },
    })

    const event = JSON.parse(response.output_text)
    return event
  } catch (error) {
    console.error("Error detecting text:", error)
  }
}

interface WordData {
  text: string
  boundingBox: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
  avgX: number
  avgY: number
}

interface OcrResult {
  rows: WordData[][]
  rowTexts: string[]
}

export async function analyzeImage(buffer: Buffer): Promise<OcrResult> {
  const gcpCredentials = JSON.parse(process.env.CLOUD_VISION_CREDENTIALS!)
  const client = new ImageAnnotatorClient({
    credentials: {
      client_email: gcpCredentials.client_email,
      private_key: gcpCredentials.private_key,
    },
    projectId: gcpCredentials.project_id,
  })

  const [result] = await client.textDetection({ image: { content: buffer } })
  const detections = result.textAnnotations

  if (!detections || detections.length === 0) {
    console.log("No text found in image.")
    return {
      rows: [],
      rowTexts: [],
    }
  }

  const words = detections.slice(1)

  const wordData: WordData[] = words.map((det) => {
    const desc = det.description || ""
    const verts = det.boundingPoly?.vertices || []

    const xVals = verts.map((v) => v.x ?? 0)
    const yVals = verts.map((v) => v.y ?? 0)

    const minX = Math.min(...xVals)
    const maxX = Math.max(...xVals)
    const minY = Math.min(...yVals)
    const maxY = Math.max(...yVals)

    const avgX = (minX + maxX) / 2
    const avgY = (minY + maxY) / 2

    return {
      text: desc,
      boundingBox: { minX, maxX, minY, maxY },
      avgX,
      avgY,
    }
  })

  wordData.sort((a, b) => a.avgY - b.avgY)

  const rowThreshold = 15
  const rows: WordData[][] = []
  let currentRow: WordData[] = []

  let lastY = wordData.length > 0 ? wordData[0].avgY : 0

  for (let i = 0; i < wordData.length; i++) {
    const w = wordData[i]
    if (Math.abs(w.avgY - lastY) < rowThreshold) {
      currentRow.push(w)
    } else {
      if (currentRow.length > 0) {
        rows.push(currentRow)
      }
      currentRow = [w]
    }
    lastY = w.avgY
  }
  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  rows.forEach((row) => {
    row.sort((a, b) => a.avgX - b.avgX)
  })

  const rowTexts = rows.map((row) => row.map((w) => w.text).join(" "))

  return {
    rows,
    rowTexts,
  }
}
