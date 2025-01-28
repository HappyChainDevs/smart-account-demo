import type { Hex } from "viem"
import type { PimlicoClient } from "permissionless/clients/pimlico"

export async function pollForCompletion(hash: Hex, pimlicoClient: PimlicoClient){
    while (true) {
        const {status, transactionHash} = await pimlicoClient.getUserOperationStatus({ hash })
        console.log(`Status for ${hash}: ${status}`)
        
        // Check if we've reached a final state
        // (Can add 'not_found' to the list as well)
        if (['included', 'failed', 'rejected'].includes(status)) {
            return status
        }
        
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}
