# This puzzle was part of The Cairo Games Vol. 1 which have already ended.

# Program hash: 0x03de5daff69563c14b56debd5c37703016f496a968aa2ce8632f6576c9371010.

%builtins output range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_nn_le

func work{range_check_ptr}(vals : felt*, i : felt):
    if i == 0:
        return ()
    end

    alloc_locals
    local j
    assert_nn_le(j, 8)
    assert [vals + j] = i

    return work(vals, i - 1)
end

func work2{range_check_ptr}(vals : felt*, i : felt):
    if i == 0:
        return ()
    end

    work(vals, 9)
    return work2(vals + 9, i - 1)
end

func copy(input : felt*, output : felt*, x):
    if x == 0:
        return ()
    end

    assert [output] = [input]
    assert [output + 1] = [input + 27]
    assert [output + 2] = [input + 54]

    copy(input + 1, output + 3, x - 1)
    return ()
end

func main{output_ptr : felt*, range_check_ptr}():
    alloc_locals

    let (local vals : felt*) = alloc()

    assert [vals + 0] = 4
    assert [vals + 20] = 1
    assert [vals + 27] = 7
    assert [vals + 34] = 9
    assert [vals + 35] = 3
    assert [vals + 37] = 6
    assert [vals + 45] = 9
    assert [vals + 56] = 6
    assert [vals + 75] = 7
    assert [vals + 85] = 8
    assert [vals + 101] = 2
    assert [vals + 105] = 7
    assert [vals + 107] = 1
    assert [vals + 123] = 5
    assert [vals + 130] = 2
    assert [vals + 137] = 6
    assert [vals + 139] = 2
    assert [vals + 153] = 6
    assert [vals + 161] = 9
    assert [vals + 164] = 8
    assert [vals + 190] = 3
    assert [vals + 196] = 4
    assert [vals + 207] = 9
    assert [vals + 214] = 1
    assert [vals + 230] = 8
    assert [vals + 239] = 4

    copy(vals, vals + 81, 27)
    copy(vals + 81, vals + 162, 27)

    work2(vals, 27)

    let output_ptr = output_ptr + 1
    return ()
end
