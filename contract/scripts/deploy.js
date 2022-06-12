async function main() {
  const MetaMan = await ethers.getContractFactory("MetaMan")

  // Start deployment, returning a promise that resolves to a contract object
  const metaMan = await MetaMan.deploy()
  await metaMan.deployed()
  console.log("Contract deployed to address:", metaMan.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
