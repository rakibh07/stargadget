import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Pagination as AntdPagination } from "antd";
import { helpers } from "@/utils/helpers";
import { filteringOptions } from "@/utils/constant/filteringOptions";

const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return <a className="px-2">PREV</a>;
  }
  if (type === "next") {
    return <a className="px-2">NEXT</a>;
  }
  return originalElement;
};

export default function Pagination() {
  const { query, pathname, push } = useRouter();
  const { limit, total, pages } = filteringOptions.pagination;
  const [page, setPage] = useState();

  useEffect(() => {
    setPage(Number(query.page) || pages);
  }, [query.page, pages]);

  const handlePageChange = (value) => {
    query.page = value;
    const queryStr = helpers.makeQuery(query, pathname);
    push(queryStr);
  };

  return (
    <AntdPagination
      className="py-4 my-4 relative border-dim/5 border-y text-xs font-bold"
      showLessItems={false}
      showTotal={(total, range) => (
        <span className="font-normal text-sm">{`Showing ${range[0]} to ${
          range[1]
        } of ${total} (${Math.ceil(total / limit)} Pages)`}</span>
      )}
      showTitle
      responsive
      defaultPageSize={limit}
      onChange={(value) => handlePageChange(value)}
      showSizeChanger={false}
      defaultCurrent={page}
      current={page}
      // showQuickJumper
      total={total}
      itemRender={itemRender}
    />
  );
}
