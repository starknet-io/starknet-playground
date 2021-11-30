# This puzzle was part of The Cairo Games Vol. 2 which have already ended.

# Program hash: 0x05db52d0f41c65eec9d6800fd405a180df63970f2d5198df0f58ab497592a984.

%builtins output range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_nn_le

const N_VERTICES = 18

func preprocess(x, arr : felt*, arr_size):
    if arr_size == 0:
        assert x = 0
        return ()
    end
    tempvar v = [arr]
    assert v = v * v
    preprocess((x - v) / 2, arr + 1, arr_size - 1)
    return ()
end

func check{range_check_ptr}(path : felt*, aux : felt*, graph : felt*, n : felt):
    if n == 0:
        return ()
    end

    tempvar cur = [path]
    assert_nn_le(cur, N_VERTICES - 1)
    assert [aux + cur] = n

    tempvar next = [path + 1]
    assert [graph + cur * N_VERTICES + next] = 1

    return check(path=path + 1, aux=aux, graph=graph, n=n - 1)
end

func main{output_ptr, range_check_ptr}():
    alloc_locals
    let (local graph : felt*) = alloc()
    preprocess(904711815024524574246580775193158565348810842345109828206640, graph, 200)
    preprocess(1662189419663012728075783146332749833, graph + 200, N_VERTICES * N_VERTICES - 200)

    let (local path : felt*) = alloc()

    assert [path] = [path + N_VERTICES]

    let (local aux : felt*) = alloc()
    check(path, aux=aux, graph=graph, n=N_VERTICES)

    let output_ptr = output_ptr + 1
    return ()
end
