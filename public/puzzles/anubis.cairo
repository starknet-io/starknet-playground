# This puzzle was part of The Cairo Games Vol. 1 which have already ended.

# Program hash: 0x01c7a9339ae888f85dfedafe53be83170a659b98331d04e9f14f5b2723178aa6.

%builtins output pedersen range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math import assert_nn_le, signed_div_rem, split_felt, unsigned_div_rem

const MAX = 1024
const BOUND = 5

struct Character:
    member strength : felt
    member wisdom : felt
    member beauty : felt
    member courage : felt
    member resolve : felt
end

func merge_value{range_check_ptr}(a, b, seed) -> (seed, res):
    alloc_locals
    let (local seed, r) = unsigned_div_rem(seed, 3)
    let (res, _) = signed_div_rem(a + b + 2 * r - 2, 2, 2 * BOUND)
    local range_check_ptr = range_check_ptr
    local final_res
    if res == BOUND + 1:
        assert final_res = BOUND
    else:
        if res == -1:
            assert final_res = 0
        else:
            assert final_res = res
        end
    end
    return (seed=seed, res=final_res)
end

func merge{range_check_ptr}(a : Character*, b : Character*, seed) -> (merged : Character*):
    alloc_locals
    let (local merged : Character*) = alloc()

    let (seed, strength) = merge_value(a.strength, b.strength, seed)
    assert merged.strength = strength

    let (seed, wisdom) = merge_value(a.wisdom, b.wisdom, seed)
    assert merged.wisdom = wisdom

    let (seed, beauty) = merge_value(a.beauty, b.beauty, seed)
    assert merged.beauty = beauty

    let (seed, courage) = merge_value(a.courage, b.courage, seed)
    assert merged.courage = courage

    let (seed, resolve) = merge_value(a.resolve, b.resolve, seed)
    assert merged.resolve = resolve

    return (merged=merged)
end

func add_new_characters{pedersen_ptr : HashBuiltin*, range_check_ptr}(
        seed, characters : Character**, n_characters, n_new_characters):
    if n_new_characters == 0:
        return ()
    end

    alloc_locals
    local i
    local j
    assert_nn_le(i, n_characters - 1)
    assert_nn_le(j, n_characters - 1)
    assert_nn_le(i, j - 1)

    let (seed) = hash2{hash_ptr=pedersen_ptr}(seed, MAX * i + j)
    local pedersen_ptr : HashBuiltin* = pedersen_ptr
    local seed = seed
    let (high, low) = split_felt(seed)
    local range_check_ptr = range_check_ptr

    let (merged) = merge(a=[characters + i], b=[characters + j], seed=low)
    assert [characters + n_characters] = merged

    return add_new_characters(
        seed=seed,
        characters=characters,
        n_characters=n_characters + 1,
        n_new_characters=n_new_characters - 1)
end

func main{output_ptr, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    alloc_locals

    let (local first : Character*) = alloc()
    assert first.strength = 0
    assert first.wisdom = 0
    assert first.beauty = 0
    assert first.courage = 0
    assert first.resolve = 0

    let (local characters : Character**) = alloc()
    assert [characters] = first
    assert [characters + 1] = first

    local n_new_characters
    assert_nn_le(n_new_characters, 30)
    add_new_characters(
        seed=0, characters=characters, n_characters=2, n_new_characters=n_new_characters)

    let last_character = [characters + 1 + n_new_characters]
    assert last_character.strength = 5
    assert last_character.wisdom = 5
    assert last_character.beauty = 5
    assert last_character.courage = 5
    assert last_character.resolve = 5

    let output_ptr = output_ptr + 1
    return ()
end
