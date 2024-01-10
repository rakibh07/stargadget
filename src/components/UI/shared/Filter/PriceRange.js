import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Slider } from "antd";
import { helpers } from "@/utils/helpers";

export default function PriceRange({ options }) {
  const { query, pathname, push } = useRouter();
  const { defaultRange, maxRange } = options;
  const [range, setRange] = useState(defaultRange);

  useEffect(() => {
    setRange(query.filter_price?.split("-") || defaultRange);
  }, [query.filter_price, defaultRange]);

  return (
    <div className="bg-white pt-3 pb-5 rounded shadow-sm">
      <h3 className="text-base my-auto font-semibold border-b pb-3 px-4">
        Price Range
      </h3>
      <div className="px-4">
        <Slider
          tooltip={{ formatter: null }}
          onChange={(values) => setRange(values)}
          onAfterChange={(values) => {
            query.filter_price = `${values[0]}-${values[1]}`;
            const queryStr = helpers.makeQuery(query, pathname);
            push(queryStr);
          }}
          className="mt-8 mb-5"
          min={maxRange[0]}
          max={maxRange[1]}
          range
          value={range}
        />
        <div className="flex justify-between space-x-2">
          <Input value={range[0]} className="w-24" />
          <Input value={range[1]} className="w-24" />
        </div>
      </div>
    </div>
  );
}
