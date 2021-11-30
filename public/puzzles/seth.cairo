# This puzzle was part of The Cairo Games Vol. 2 which have already ended.

# Program hash: 0x00cf6401184240e5571d4ec37bc01ca71f2b52bb8d339a0847a7a5fba710b538.

%builtins output pedersen range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.hash_chain import hash_chain
from starkware.cairo.common.math import split_felt, unsigned_div_rem

const SIZE = 100
const COUNT = 100

func check{pedersen_ptr : HashBuiltin*, range_check_ptr}(items : felt*, seed, n, type):
    if n == 0:
        return ()
    end

    alloc_locals

    let (high, low) = split_felt(seed)
    let (_, r) = unsigned_div_rem(low, SIZE)

    local preimage
    let (image) = hash2{hash_ptr=pedersen_ptr}(preimage, preimage)

    tempvar item = [items + r]
    if type == 0:
        assert item = 0
    else:
        assert item = image
    end
    let (seed) = hash2{hash_ptr=pedersen_ptr}(seed, preimage)
    let (seed) = hash2{hash_ptr=pedersen_ptr}(seed, item)

    return check(items=items, seed=seed, n=n - 1, type=1 - type)
end

func main{output_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    alloc_locals
    let (local data : felt*) = alloc()
    assert [data] = SIZE
    let (seed) = hash_chain{hash_ptr=pedersen_ptr}(data)

    check(items=data + 1, seed=seed, n=COUNT, type=0)
    let output_ptr = output_ptr + 1
    return ()
end
