# This puzzle was part of The Cairo Games Vol. 2 which have already ended.

# Program hash: 0x06582cc829356dd1b904a176ad084a5e019fb9b857f8d3b7d8bd3a9b4107b436.

%builtins output pedersen range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.dict_access import DictAccess
from starkware.cairo.common.hash_chain import hash_chain
from starkware.cairo.common.math import assert_nn_le
from starkware.cairo.common.registers import get_fp_and_pc
from starkware.cairo.common.squash_dict import squash_dict

func get_data() -> (res : felt*):
    alloc_locals
    local a0 = 0
    local a = 2
    local a = 4
    local a = 6
    local a = 1
    local a = 3
    local a = 5
    local a = 7
    local a = 8
    local a = 32
    local a = 24
    local a = 16
    local a = 9
    local a = 33
    local a = 25
    local a = 17
    local a = 10
    local a = 34
    local a = 26
    local a = 18
    local a = 24
    local a = 26
    local a = 28
    local a = 30
    local a = 25
    local a = 27
    local a = 29
    local a = 31
    local a = 4
    local a = 32
    local a = 44
    local a = 20
    local a = 3
    local a = 39
    local a = 43
    local a = 19
    local a = 2
    local a = 38
    local a = 42
    local a = 18
    local a = 16
    local a = 18
    local a = 20
    local a = 22
    local a = 17
    local a = 19
    local a = 21
    local a = 23
    local a = 6
    local a = 24
    local a = 42
    local a = 12
    local a = 5
    local a = 31
    local a = 41
    local a = 11
    local a = 4
    local a = 30
    local a = 40
    local a = 10
    local a = 8
    local a = 10
    local a = 12
    local a = 14
    local a = 9
    local a = 11
    local a = 13
    local a = 15
    local a = 0
    local a = 16
    local a = 40
    local a = 36
    local a = 7
    local a = 23
    local a = 47
    local a = 35
    local a = 6
    local a = 22
    local a = 46
    local a = 34
    local a = 32
    local a = 34
    local a = 36
    local a = 38
    local a = 33
    local a = 35
    local a = 37
    local a = 39
    local a = 2
    local a = 8
    local a = 46
    local a = 28
    local a = 1
    local a = 15
    local a = 45
    local a = 27
    local a = 0
    local a = 14
    local a = 44
    local a = 26
    local a = 40
    local a = 42
    local a = 44
    local a = 46
    local a = 41
    local a = 43
    local a = 45
    local a = 47
    local a = 22
    local a = 30
    local a = 38
    local a = 14
    local a = 21
    local a = 29
    local a = 37
    local a = 13
    local a = 20
    local a = 28
    local a = 36
    local a = 12
    let (__fp__, _) = get_fp_and_pc()
    return (res=&a0)
end

func cycle{state : DictAccess*}(values : felt*):
    let state0 = state
    let state1 = state0 + DictAccess.SIZE
    let state2 = state1 + DictAccess.SIZE
    let state3 = state2 + DictAccess.SIZE
    assert state0.key = [values + 0]
    assert state1.key = [values + 1]
    assert state2.key = [values + 2]
    assert state3.key = [values + 3]
    assert state0.new_value = state3.prev_value
    assert state1.new_value = state0.prev_value
    assert state2.new_value = state1.prev_value
    assert state3.new_value = state2.prev_value
    let state = state + 4 * DictAccess.SIZE
    return ()
end

func run{range_check_ptr, state : DictAccess*}(data : felt*, sol : felt*, sol_size : felt):
    if sol_size == 0:
        return ()
    end
    tempvar x = [sol]
    assert_nn_le(x, 5)
    cycle(data + 20 * x)
    cycle(data + 20 * x + 4)
    cycle(data + 20 * x + 8)
    cycle(data + 20 * x + 12)
    cycle(data + 20 * x + 16)

    run(data=data, sol=sol + 1, sol_size=sol_size - 1)
    return ()
end

func get_initial_value{hash_ptr : HashBuiltin*}() -> (initial_value : felt*):
    alloc_locals
    let (local initial_value : felt*) = alloc()
    assert [initial_value] = 48
    let (res) = hash_chain(initial_value)
    assert res = 402684044838294963951952172461450293510735826065192598384325922359699836469

    let (res) = hash_chain(initial_value + 1)
    assert res = 1508108551069464286813785297355641266663485599320848393798932455588476865295

    let (res) = hash_chain(initial_value + 7)
    assert res = 2245701625176425331085101334837624242646502129018701371434984384296915870715

    let (res) = hash_chain(initial_value + 12)
    assert res = 3560520899812162122215526869789497390123010766571927682749531967294685134040

    let (res) = hash_chain(initial_value + 18)
    assert res = 196997208112053944281778155212956924860955084720008751336605214240056455402

    let (res) = hash_chain(initial_value + 24)
    assert res = 1035226353110224801512289478587695122129015832153304072590365512606504328818

    let (res) = hash_chain(initial_value + 30)
    assert res = 1501038259288321437961590173137394957125779122158200548115283728521438213428

    let (res) = hash_chain(initial_value + 34)
    assert res = 3537881782324467737440957567711773328493014027685577879465936840743865613662

    let (res) = hash_chain(initial_value + 39)
    assert res = 1039623306816876893268944011668782810398555904667703809415056949499773381189

    let (res) = hash_chain(initial_value + 42)
    assert res = 2508528289207660435870821551803296739495662639464901004905339054353214007301

    return (initial_value=initial_value + 1)
end

func verify(squashed_dict : felt*, initial_value : felt*, n):
    if n == 6:
        return ()
    end

    assert [squashed_dict + 0] = n * 8
    assert [squashed_dict + 1] = [initial_value]
    assert [squashed_dict + 2] = n

    assert [squashed_dict + 3] = n * 8 + 1
    assert [squashed_dict + 4] = [initial_value + 1]
    assert [squashed_dict + 5] = n

    assert [squashed_dict + 6] = n * 8 + 2
    assert [squashed_dict + 7] = [initial_value + 2]
    assert [squashed_dict + 8] = n

    assert [squashed_dict + 9] = n * 8 + 3
    assert [squashed_dict + 10] = [initial_value + 3]
    assert [squashed_dict + 11] = n

    assert [squashed_dict + 12] = n * 8 + 4
    assert [squashed_dict + 13] = [initial_value + 4]
    assert [squashed_dict + 14] = n

    assert [squashed_dict + 15] = n * 8 + 5
    assert [squashed_dict + 16] = [initial_value + 5]
    assert [squashed_dict + 17] = n

    assert [squashed_dict + 18] = n * 8 + 6
    assert [squashed_dict + 19] = [initial_value + 6]
    assert [squashed_dict + 20] = n

    assert [squashed_dict + 21] = n * 8 + 7
    assert [squashed_dict + 22] = [initial_value + 7]
    assert [squashed_dict + 23] = n
    verify(squashed_dict=squashed_dict + 24, initial_value=initial_value + 8, n=n + 1)
    return ()
end

func main{output_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    alloc_locals
    let (local data : felt*) = get_data()
    let (local sol : felt*) = alloc()
    local sol_size

    let (state : DictAccess*) = alloc()
    local state_start : DictAccess* = state

    run{state=state}(data, sol, sol_size)

    let (local squashed_dict : DictAccess*) = alloc()
    let (squashed_dict_end) = squash_dict(
        dict_accesses=state_start, dict_accesses_end=state, squashed_dict=squashed_dict)
    assert squashed_dict_end = squashed_dict + DictAccess.SIZE * 48
    local range_check_ptr = range_check_ptr

    let (initial_value) = get_initial_value{hash_ptr=pedersen_ptr}()
    local pedersen_ptr : HashBuiltin* = pedersen_ptr
    verify(squashed_dict=squashed_dict, initial_value=initial_value, n=0)

    let output_ptr = output_ptr + 1
    return ()
end
