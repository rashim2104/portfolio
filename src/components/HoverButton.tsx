"use client";

import React from "react";
import { Button } from "@/once-ui/components";
import styles from "./HoverButton.module.scss";

const HoverButton = () => {
  return (
    <Button
      href="/about"
      variant="secondary"
      className={styles.hoverButton}
    >
      Learn More About Me
    </Button>
  );
};

export default HoverButton;