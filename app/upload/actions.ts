"use server"

import OpenAI from "openai"

// export const maxDuration = 30 // Vercel maximum execution time setting (overrides default of 15s)

export async function file(formData: FormData) {
  const file = formData.get("file") as File
  console.log("File name:", file.name, "| File size:", file.size)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64Image = buffer.toString("base64")

  try {
    const openai = new OpenAI()

    const response = await openai.responses.create({
      // model: "gpt-4o-mini-2024-07-18",
      // model: "gpt-4o-mini-2024-07-18",
      model: "gpt-4.1-mini-2025-04-14",
      input: [
        {
          role: "system",
          content: "You are extracting stats from a League of Legends post-game lobby screenshot.",
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Extract the post-game stats from the image." },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${base64Image}`,
              detail: "high",
            },
          ],
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
