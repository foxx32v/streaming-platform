'use client'

import { useEffect } from "react";
import { PageAuth } from "../src/components";
export default function Home() {
  useEffect(() => {document.documentElement.setAttribute('data-theme', 'midnight');},[])
  return (
    <div>
      <PageAuth/>
    </div>
  );
}