const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const topics = [
  "concerts",
  "painting",
  "cat",
  "creative coding",
  "groceries",
  "cooking",
  "planning trips",
  "running",
  "bouldering",
  "listening to and discovering new music",
  "reading",
  "socialising",
  "buying gifts",
  "shopping for clothes",
  "watching movies",
];

const TEST_USER_ID = process.env.TEST_USER_ID;
const SEED_COUNT = 200;

async function seedDatabase() {
  console.log(`Seeding database for user ${TEST_USER_ID}...`);

  try {
    // Clear current notes
    await prisma.note.deleteMany({
      where: {
        authorId: TEST_USER_ID,
      },
    });

    for (let i = 0; i < SEED_COUNT; i++) {
      const title = topics[Math.floor(Math.random() * topics.length)];
      const content =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      const authorId = TEST_USER_ID as string;

      // Randomly decide if the note should connect to others
      let relatedNotes = undefined;
      if (Math.random() < 0.8) {
        // Determine how many notes to connect to (1-5 randomly)
        const numRelated = Math.floor(Math.random() * 5) + 1;
        // Find numRelated random notes that already exist in the database
        const randomNotes = await prisma.note.findMany({
          take: numRelated,
          skip: Math.floor(Math.random() * i), // Randomly skip existing notes
        });
        relatedNotes = {
          // @ts-ignore
          connect: randomNotes.map((note) => ({ id: note.id })),
        };
      }

      const note = await prisma.note.create({
        data: {
          title: title,
          content: content,
          authorId: authorId,
          relatedNotes: relatedNotes,
        },
      });

      console.log(
        `[${i + 1} / ${SEED_COUNT}] - `,
        `Created note with id: ${note.id}`
      );
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
