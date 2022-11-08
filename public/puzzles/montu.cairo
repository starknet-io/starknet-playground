# This puzzle was part of The Cairo Games Vol. 2 which have already ended.

# Program hash: 0x045b85fc4ff1449c34a0903474b2491c786faac36b9e5a66fb123e315b313c88.

%builtins output pedersen

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash_state import HashState, hash_finalize, hash_init, hash_update

func compute_next_layer(
    input : felt*, output : felt*, length : felt, alpha : felt, x : felt, g : felt
):
    tempvar a = [input]
    tempvar b = [input + length]
    assert [output] = (a + b) / 2 + alpha * (a - b) / (2 * x)
    if x * g == -1:
        return ()
    end
    return compute_next_layer(
        input=input + 1, output=output + 1, length=length, alpha=alpha, x=x * g, g=g
    )
end

func verify{hash_ptr : HashBuiltin*, hash_state_ptr : HashState*}(
    input : felt*, length : felt, g : felt
):
    alloc_locals

    if length == 2:
        assert [input] = [input + 1]
        return ()
    end

    # Compute alpha.
    let (hash_state_ptr) = hash_update(
        hash_state_ptr=hash_state_ptr, data_ptr=input, data_length=length
    )
    let (alpha) = hash_finalize(hash_state_ptr=hash_state_ptr)
    local hash_ptr : HashBuiltin* = hash_ptr
    local hash_state_ptr : HashState* = hash_state_ptr

    let (local next_layer : felt*) = alloc()
    compute_next_layer(input=input, output=next_layer, length=length / 2, alpha=alpha, x=1, g=g)

    return verify(input=next_layer, length=length / 2, g=g * g)
end

func compare(input : felt*, output : felt*, length : felt) -> (diff : felt):
    if length == 0:
        return (diff=0)
    end

    let (diff) = compare(input=input + 1, output=output + 1, length=length - 1)
    if [input] == [output]:
        return (diff=diff)
    else:
        return (diff=diff + 1)
    end
end

func main{output_ptr : felt*, pedersen_ptr : HashBuiltin*}():
    alloc_locals

    const LENGTH = 8
    const G = 2804690217475462062143361339624939640984649667966511418446363596075299761851

    let (input) = alloc()

    assert [input] = (
        2760163267763136926307712447289333015931143661720962520709479367174330989984)
    assert [input + 1] = (
        620345510678501588305616341951109830750033614090225920347864657883483407165)
    assert [input + 2] = (
        3181959697776337130511545402257206919343979808211484609881516936335798865334)
    assert [input + 3] = (
        1830152343057623004121086982129442788610913917055044983876581372969127139593)
    assert [input + 4] = (
        3553572895696142252358926310847411672039878792883770142922873977486098926969)
    assert [input + 5] = (
        2462248735454554379268841047904517280521029943202779759148500485193601548624)
    assert [input + 6] = (
        792090413233267968557021563731724001464889355006703125688313681478453789157)
    assert [input + 7] = (
        1348005446214778757482455457529115254152067928062775094282398020688141612139)

    let (local modified_input) = alloc()

    let (diff) = compare(input=input, output=modified_input, length=LENGTH)
    assert diff = 3

    let (hash_state_ptr) = hash_init()

    verify{hash_ptr=pedersen_ptr, hash_state_ptr=hash_state_ptr}(
        input=modified_input, length=LENGTH, g=G
    )

    let output_ptr = output_ptr + 1
    return ()
end
