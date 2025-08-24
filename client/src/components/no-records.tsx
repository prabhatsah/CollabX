import { Panda } from 'lucide-react';
import React from 'react';

const NoRecordsFound = () => {
  return (
    <div className=" flex flex-col w-full h-[60vh] justify-center items-center gap-5">
      <Panda className="size-50" />
      <label className="text-3xl font">No Data Available</label>
    </div>
  );
};

export default NoRecordsFound;
