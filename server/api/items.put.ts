export default defineEventHandler(async () => {
  const items = JSON.parse(await useKv().get("items") ?? "[]");
  const id = items.length + 1;

  items.push({
    id,
    title: `Item ${id}`,
  });

  return await useKv().put("items", JSON.stringify(items));
});