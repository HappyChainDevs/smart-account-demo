import { getPimlicoClient } from "./getPimlicoClient";

const client = getPimlicoClient() 
async function main() {
    const id = await client.getChainId()
    console.log("Chain id: ", id)
}
main().then(() => {
    console.log("Test completed successfully");
    setTimeout(() => process.exit(0), 100);
}).catch((error) => {   
    console.error(error);
    process.exit(1);
})