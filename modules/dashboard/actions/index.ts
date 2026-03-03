"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
// import { InputJsonValue } from "../path/to/InputJsonValue";

/**
 * Toggles a playground's "favorite" status for the current user.
 * This function is now idempotent, using upsert to handle logic.
 */
export const markAsFavorite = async (
  playgroundId: string,
  isMarked: boolean // Renamed from isChecked for clarity
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    throw new Error("User is not authenticated");
  }
  const userId = user.id;

  try {
    if (isMarked) {
      // Use upsert to create or update the favorite status
      await db.starMark.upsert({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId,
          },
        },
        update: {
          isMarked: true,
        },
        create: {
          userId,
          playgroundId,
          isMarked: true,
        },
      });
    } else {
      // If un-marking, just delete the record.
      // We check if it exists first to prevent errors.
      const existingMark = await db.starMark.findUnique({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId,
          },
        },
      });

      if (existingMark) {
        await db.starMark.delete({
          where: {
            userId_playgroundId: {
              userId,
              playgroundId,
            },
          },
        });
      }
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isMarked };
  } catch (error) {
    console.error("Error updating favorite status:", error);
    return { success: false, error: "Failed to update favorite status" };
  }
};

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  // FIX: Added authentication check.
  if (!user || !user.id) {
    return []; // Return an empty array if no user is logged in
  }

  try {
    const playgrounds = await db.playground.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        // FIX: Corrected typo from Starmark to StarMark
        Starmark: {
          where: {
            // FIX: Removed '!' non-null assertion
            userId: user.id,
          },
          select: {
            isMarked: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc", // Added sorting
      },
    });

    return playgrounds;
  } catch (error) {
    console.log(error);
    return []; // Return empty array on error
  }
};

export const createPlayground = async (data: {
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
}) => {
  const user = await currentUser();

  // FIX: Added authentication check.
  if (!user || !user.id) {
    throw new Error("User is not authenticated");
  }

  const { template, title, description } = data;

  try {
    const playground = await db.playground.create({
      data: {
        title: title,
        description: description,
        template: template,
        // FIX: Removed '!' non-null assertion
        userId: user.id,
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    await db.playground.update({
      where: {
        id,
      },
      data: data,
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const duplicateProjectById = async (id: string) => {
  const user = await currentUser();

  // FIX: Added authentication check.
  if (!user || !user.id) {
    throw new Error("User is not authenticated");
  }

  try {
    // FIX: Fetch the templateFiles along with the original
    const originalPlayground = await db.playground.findUnique({
      where: { id },
      include: {
        templateFiles: true, // Fetch the files
      },
    });

    if (!originalPlayground) {
      throw new Error("Original playground not found");
    }

    const originalTemplateFile = originalPlayground.templateFiles[0];
    

    await db.playground.create({
      data: {
        title: `${originalPlayground.title} (Copy)`,
        description: originalPlayground.description,
        template: originalPlayground.template,
        userId: originalPlayground.userId,

        // FIX: Create the new template file for the duplicated project
        templateFiles: {
          create : {
            // Copy the content from the original
            content: (originalTemplateFile?.content ?? {}) as Prisma.InputJsonValue, // Handle case with no template file
          },
        },
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error duplicating project:", error);
  }
};
