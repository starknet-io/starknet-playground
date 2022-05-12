# This puzzle was part of The Cairo Games Vol. 1 which have already ended.

# Program hash: 0x02bb25e03624218e0211798da4064586ea37958590167006bff1be82e0d99858.

%builtins output pedersen ecdsa

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.signature import verify_ecdsa_signature

func main{output_ptr : felt*, pedersen_ptr : HashBuiltin*, ecdsa_ptr : SignatureBuiltin*}():
    alloc_locals

    local your_eth_addr
    local signature_r
    local signature_s

    let (x) = hash2{hash_ptr=pedersen_ptr}(your_eth_addr, your_eth_addr)
    verify_ecdsa_signature(
        x,
        124221662027375191599785306371100866827147974414679244246692561282978781776,
        signature_r,
        signature_s,
    )

    assert [output_ptr] = your_eth_addr
    let output_ptr = output_ptr + 1

    return ()
end
