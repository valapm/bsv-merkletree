const { buildContractClass, compileContract } = require("scryptlib");

const MerkleTree = buildContractClass(
  compileContract("test/testMerkleTree.scrypt")
);
const merkleTree = new MerkleTree();

test("verifyLeaf", () => {
  const result = merkleTree.testVerifyLeaf().verify();
  expect(result.success).toBe(true);
});

test("addLeaf", () => {
  const result = merkleTree.testAddLeaf().verify();
  expect(result.success).toBe(true);
});

test("updateLeaf", () => {
  const result = merkleTree.testUpdateLeaf().verify();
  expect(result.success).toBe(true);
});
