import React from "react";
import auth from "../assets/auth.jpg";
import { Card } from "@/components/ui/card";
const Signup = () => {
  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="flex items-center">
        <img src={auth} alt="" className="h-[900px]" />

        {/* Signup page */}
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
