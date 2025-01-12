"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

function page() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <SignIn routing="path" path="/signin" />
        </div>
    );
}

export default page;