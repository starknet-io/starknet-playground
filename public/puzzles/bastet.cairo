# This puzzle was part of The Cairo Games Vol. 1 which have already ended.

# Program hash: 0x01ccacb5473cbcc8032bf8804eca3fc6a68a6320afc7113ba2355862895e95e2.

%builtins output

from starkware.cairo.common.alloc import alloc

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

func run(sol : felt*, sol_size, arr : felt*, i):
    if sol_size == 0:
        assert i = 223
        return ()
    end

    alloc_locals
    assert [arr + i] = 0

    local j
    tempvar value = [sol]
    if value == 0:
        assert j = i - 25
    else:
        if value == 1:
            assert j = i + 1
        else:
            if value == 2:
                assert j = i + 25
            else:
                assert j = i - 1
            end
        end
    end
    run(sol=sol + 1, sol_size=sol_size - 1, arr=arr, i=j)
    return ()
end

func main{output_ptr : felt*}():
    alloc_locals

    const VALUE = 1809251367787892036301135595905628874434260928980393026255783426015239340031
    let (local arr : felt*) = alloc()
    const ARR_SIZE = 250
    preprocess(x=VALUE, arr=arr, arr_size=ARR_SIZE)

    let (local sol : felt*) = alloc()
    local sol_size
    run(sol=sol, sol_size=sol_size, arr=arr, i=26)
    let output_ptr = output_ptr + 1
    return ()
end
