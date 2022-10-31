import {
  addLeaf,
  verifyLeaf,
  getMerkleRoot,
  getMerklePath,
  getMerkleRootByPath,
  updateLeaf,
} from "../src";
import { sha256d } from "../src/sha";

test("Add leafs", () => {
  const hashes = [sha256d("01"), sha256d("02"), sha256d("03"), sha256d("04")];

  const root = getMerkleRoot(hashes);
  const lastPath = getMerklePath(3, hashes);

  expect(verifyLeaf(sha256d("04"), lastPath, root)).toBe(true);

  const root2 = addLeaf("04", lastPath, root, "05");

  const hashes2 = hashes.concat([sha256d("05")]);
  const lastPath2 = getMerklePath(4, hashes2);

  expect(verifyLeaf(sha256d("05"), lastPath2, root2)).toBe(true);

  const rootTest = getMerkleRoot([
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
  ]);

  expect(rootTest).toBe(root2);

  const root3 = addLeaf("05", lastPath2, root2, "06");

  const hashes3 = hashes2.concat([sha256d("06")]);
  const lastPath3 = getMerklePath(5, hashes3);

  expect(verifyLeaf(sha256d("06"), lastPath3, root3)).toBe(true);

  const rootTest2 = getMerkleRoot([
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
  ]);

  expect(rootTest2).toBe(root3);

  const root4 = addLeaf("06", lastPath3, root3, "07");

  const hashes4 = hashes3.concat([sha256d("07")]);
  const lastPath4 = getMerklePath(6, hashes4);

  expect(verifyLeaf(sha256d("07"), lastPath4, root4)).toBe(true);

  const rootTest3 = getMerkleRoot([
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
  ]);

  expect(rootTest3).toBe(root4);
});

test("calculate valid paths", () => {
  const hashes = [
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
    sha256d("09"),
    sha256d("10"),
    sha256d("11"),
    sha256d("12"),
    sha256d("13"),
    sha256d("14"),
    sha256d("15"),
    sha256d("16"),
    sha256d("17"),
    sha256d("18"),
    sha256d("19"),
    sha256d("20"),
  ];

  const root = getMerkleRoot(hashes);

  const path = getMerklePath(3, hashes);
  expect(verifyLeaf(sha256d("04"), path, root)).toBe(true);

  const path2 = getMerklePath(4, hashes);
  expect(verifyLeaf(sha256d("05"), path2, root)).toBe(true);

  const path3 = getMerklePath(5, hashes);
  expect(verifyLeaf(sha256d("06"), path3, root)).toBe(true);
});

test("update leafs", () => {
  const hashes = [
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
  ];

  const root = getMerkleRoot(hashes);

  const root2 = updateLeaf("03", "08", getMerklePath(2, hashes), root);
  const hashes2 = [
    sha256d("01"),
    sha256d("02"),
    sha256d("08"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
  ];

  expect(getMerkleRoot(hashes2)).toBe(root2);
});

test("update leafs", () => {
  const hashes = [
    sha256d("01"),
    sha256d("02"),
    sha256d("03"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
    sha256d("08"),
    sha256d("09"),
    sha256d("10"),
    sha256d("11"),
    sha256d("12"),
    sha256d("13"),
    sha256d("14"),
    sha256d("15"),
    sha256d("16"),
    sha256d("17"),
    sha256d("18"),
    sha256d("19"),
    sha256d("20"),
  ];

  const root = getMerkleRoot(hashes);

  const root2 = updateLeaf("03", "08", getMerklePath(2, hashes), root);

  const hashes2 = [
    sha256d("01"),
    sha256d("02"),
    sha256d("08"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
    sha256d("08"),
    sha256d("09"),
    sha256d("10"),
    sha256d("11"),
    sha256d("12"),
    sha256d("13"),
    sha256d("14"),
    sha256d("15"),
    sha256d("16"),
    sha256d("17"),
    sha256d("18"),
    sha256d("19"),
    sha256d("20"),
  ];

  expect(getMerkleRoot(hashes2)).toBe(root2);
});

test("merkelize array", () => {
  const array = [
    sha256d("01"),
    sha256d("02"),
    sha256d("08"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
    sha256d("08"),
    sha256d("09"),
    sha256d("10"),
    sha256d("11"),
    sha256d("12"),
    sha256d("13"),
    sha256d("14"),
    sha256d("15"),
    sha256d("16"),
    sha256d("17"),
    sha256d("18"),
    sha256d("19"),
    sha256d("20"),
  ];

  const newArray = [
    sha256d("01"),
    sha256d("02"),
    sha256d("123"),
    sha256d("04"),
    sha256d("05"),
    sha256d("06"),
    sha256d("07"),
    sha256d("08"),
    sha256d("09"),
    sha256d("10"),
    sha256d("11"),
    sha256d("12"),
    sha256d("13"),
    sha256d("14"),
    sha256d("15"),
    sha256d("16"),
    sha256d("17"),
    sha256d("18"),
    sha256d("19"),
    sha256d("20"),
  ];

  const merklePath = getMerklePath(2, array);
  const newMerklePath = getMerklePath(2, newArray);

  const oldMerkleRoot = getMerkleRootByPath(sha256d("03"), merklePath);
  const newMerkleRoot = getMerkleRootByPath(sha256d("123"), newMerklePath);

  const newMerkleRoot2 = updateLeaf("03", "123", merklePath, oldMerkleRoot);

  expect(newMerkleRoot).toBe(newMerkleRoot2);
});
