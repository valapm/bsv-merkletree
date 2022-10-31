# bsv-merkletree

Merkle Tree functions for Bitcoin SV.
This repo contains two equivalent implementations, one in Typescript and one in sCrypt that compiles to Bitcoin Script.

Install with `npm install bsv-merkletree`.

## Getting started

Here are all functions exposed by the library:

```typescript
import {
  getMerkleRoot,
  merkelizeArray,
  getMerklePath,
  getMerkleRootByPath,
  verifyLeaf,
  addLeaf,
  updateLeaf,
  sha256,
  sha256d,
} from "bsv-merkletree";

const entries = ["01", "02", "03"];

const leafs = entries.map(sha256d);

// Calculate merkle root
const merkleRoot = getMerkleRoot(leafs);

// Get merkle path / merkle proof by position
const position = 1;
const merklePath = getMerklePath(position, leafs);

// Get merkle root by merkle path/proof
const merkleRoot = getMerkleRootByPath(leafs[position], merklePath);

// Verify leaf
const isValid = verifyLeaf(leafs[position], merklePath, merkleRoot);

// Add new entry to merkle tree
const newMerkleRoot = addLeaf(
  lastEntry,
  lastMerklePath,
  oldMerkleRoot,
  newEntry
);

// Update some entry within the merkle tree
const newMerkleRoot = updateLeaf(oldEntry, newEntry, merklePath, oldMerkleRoot);
```

And the equivalent functions in sCrypt:

```sCrypt
import "./merkleTree.scrypt";

bytes merkleRoot = calculateMerkleRoot(leaf, merklePath);

bool isValid = MerkleTree.verifyLeaf(leaf, merklePath, merkleRoot);

bytes newMerkleRoot = MerkleTree.addLeaf(lastEntry, lastMerklePath, oldMerkleRoot, newEntry);

bytes newMerkleRoot = MerkleTree.updateLeaf(oldEntry, newEntry, merklePath, oldMerkleRoot);
```
