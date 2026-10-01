import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GMModule = buildModule("GMModule", (m) => {
  const gm = m.contract("GM");
  return { gm };
});

export default GMModule;
