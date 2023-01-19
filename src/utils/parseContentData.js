export default function (data) {
  return Object.keys(data)
    .map((key) => {
      return {
        id: key,
        ...data[key],
      };
    })
    .sort(function (a, b) {
      return a.createdAt < b.createdAt ? -1 : a.createdAt ? 1 : 0;
    });
}
