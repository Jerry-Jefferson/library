const mockBooks = Array.from({ length: 10000 }, (_, i) => ({
  _id: { toString: () => `id_${i}` },
  title: `Book ${i}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: { name: "Author Name" },
}));

async function runBenchmark() {
  console.log("Test starts");

  const startJSON = performance.now();
  for (let i = 0; i < 10000; i++) {
    JSON.parse(JSON.stringify(mockBooks));
  }
  const endJSON = performance.now();
  console.log(`JSON метод: ${endJSON - startJSON} мс`);

  const startMap = performance.now();
  for (let i = 0; i < 10000; i++) {
    mockBooks.map((book) => ({
      ...book,
      _id: book._id.toString(),
      createdAt: book.createdAt.toISOString(),
    }));
  }
  const endMap = performance.now();
  console.log(`Map метод: ${endMap - startMap} ms`);
}

runBenchmark();
