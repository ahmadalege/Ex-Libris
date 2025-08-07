import prisma from "@/lib/db";
import type { Genre } from "@/generated/prisma";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";
import { ProtectedRoute } from "@/components/ProtectedRoute";

async function createGenre(data: FormData) {
  "use server";
  const genre = data.get("genre")?.toString().trim();
  if (!genre) throw new Error("Name is required");

  try {
    await prisma.genre.create({ data: { name: genre } });
    revalidatePath("/admin/genres");
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      toast.error("This genre already exists!");
    } else {
      toast.error("An error occurred while creating the genre.");
    }
  }
}

async function updateGenre(data: FormData) {
  "use server";
  const id = data.get("id")?.toString();
  const name = data.get("name")?.toString().trim();
  if (!id || !name) throw new Error("Invalid data");

  await prisma.genre.update({
    where: { id },
    data: { name },
  });
  revalidatePath("/admin/genres");
}

async function deleteGenre(data: FormData) {
  "use server";
  const id = data.get("id")?.toString();
  if (!id) throw new Error("Invalid id");

  await prisma.genre.delete({ where: { id } });
  revalidatePath("/admin/genres");
}

export default async function GenrePage() {
  const genres: Genre[] = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center p-6">
        <div className="relative w-full max-w-2xl">
          {/* Ornate Border Frame */}
          <div
            className="absolute -inset-4 border-2 border-amber-200/40 rounded-lg"
            style={{
              backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(217, 119, 6, 0.05) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(217, 119, 6, 0.05) 50%, transparent 60%)
            `,
            }}
          ></div>

          <div className="relative bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] rounded-lg shadow-2xl border border-amber-200/60 p-8">
            <div className="text-center mb-6">
              <h1
                className="text-3xl font-serif text-amber-800 mb-2"
                style={{
                  fontFamily: "'Crimson Text', 'Times New Roman', serif",
                }}
              >
                Manage Genres
              </h1>
              <div className="flex items-center justify-center space-x-2 opacity-60 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
                <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                <div className="w-2 h-px bg-amber-600"></div>
                <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                <div className="w-2 h-px bg-amber-600"></div>
                <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
              </div>
            </div>

            <form action={createGenre} className="flex space-x-2 mb-8">
              <input
                name="genre"
                placeholder="New genre name"
                className="flex-1 border px-4 py-2 bg-[#fdf6e3] border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-serif rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Add
              </button>
            </form>

            <ul className="space-y-6">
              {genres.map((g) => (
                <li key={g.id} className="flex items-center space-x-4">
                  <form action={updateGenre} className="flex-1 flex space-x-2">
                    <input type="hidden" name="id" value={g.id} />
                    <input
                      type="text"
                      name="name"
                      defaultValue={g.name}
                      className="w-full pl-4 pr-6 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-serif rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Save
                    </button>
                  </form>

                  {/* Delete Genre Form */}
                  <form action={deleteGenre}>
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-serif rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
