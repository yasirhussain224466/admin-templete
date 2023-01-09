/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
export const searchArray = (data, keyword) => {
  const result = [];
  if (data?.length === 0) return;
  data.forEach((item) => {
    let matched = false;
    Object.keys(item).forEach((key) => {
      if (
        item &&
        typeof item[key] === "string" &&
        item[key]?.toLowerCase().match(keyword.toLowerCase())
      ) {
        return (matched = true);
      }
      if (item && typeof item[key] === "object") {
        if (item[key]) {
          Object.keys(item[key]).forEach((val) => {
            if (
              item[key][val] &&
              typeof item[key][val] === "string" &&
              item[key][val]?.toLowerCase().match(keyword.toLowerCase())
            ) {
              return (matched = true);
            }

            if (item && typeof item[key][val] === "object") {
              if (item[key][val]) {
                Object.keys(item[key][val]).forEach((child) => {
                  if (
                    item[key][val][child] &&
                    typeof item[key][val][child] === "string" &&
                    item[key][val][child]
                      ?.toLowerCase()
                      .match(keyword.toLowerCase())
                  ) {
                    return (matched = true);
                  }
                });
              }
            }
          });
        }
      }
    });
    if (matched) {
      result.push(item);
    }
  });
  return result;
};
