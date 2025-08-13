import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";

const Test = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
    
      <div>
        <Button variant={"elevated"}> Simple Button</Button>
      </div>
      <div>
        <Input placeholder="This is input" />
      </div>
      <div>
        <Textarea placeholder="This is textarea" />
      </div>
      <div>
        <Progress value={30} />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  );
};

export default Test;
