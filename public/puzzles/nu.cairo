# This puzzle was part of The Cairo Games Vol. 2 which have already ended.

# Program hash: 0x06354fc86d45ef097b849c0e807b54a1a0b29b74a26e63c82704dbb959f220d4.

# Prove that the prime number 17 is in fact composite!

%builtins output range_check

from starkware.cairo.common.math import assert_nn

func main(output_ptr : felt*, range_check_ptr) -> (output_ptr : felt*, range_check_ptr : felt):
    alloc_locals
    local x
    local y
    assert_nn{range_check_ptr=range_check_ptr}(x - 2)
    assert_nn{range_check_ptr=range_check_ptr}(y - 2)
    assert x * y = 17
    return (output_ptr=output_ptr + 1, range_check_ptr=range_check_ptr)
end
