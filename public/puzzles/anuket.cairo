# This puzzle was part of The Cairo Games Vol. 1 which have already ended.

# Program hash: 0x07c3f4213b73add76c732870ce828f818d25f866d94f9260f30269138fc65ccf.

%builtins output range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_nn_le
from starkware.cairo.common.registers import get_fp_and_pc

const VALUE_BOUND = 7
const AMOUNT = 3

struct List:
    member head : felt
    member tail : List*
end

struct Action:
    member typ : felt
    member value : felt
    member next : Action*
end

struct Context:
    member value : felt
    member list1 : List*
    member list2 : List*
    member state : Action*
end

func action0(context : Context*, action : Action*) -> (context : Context*):
    alloc_locals
    local new_list2 : List
    local new_context : Context
    let (__fp__, _) = get_fp_and_pc()

    assert new_list2.tail = context.list2
    assert new_list2.head = action.value
    assert new_context.list2 = &new_list2
    tempvar list1 = context.list1
    assert new_context.value = list1.head
    assert new_context.list1 = list1.tail
    assert new_context.state = action.next
    return (context=&new_context)
end

func action1(context : Context*, action : Action*) -> (context : Context*):
    alloc_locals
    local new_list1 : List
    local new_context : Context
    let (__fp__, _) = get_fp_and_pc()

    assert new_list1.tail = context.list1
    assert new_list1.head = action.value
    assert new_context.list1 = &new_list1
    tempvar list2 = context.list2
    assert new_context.value = list2.head
    assert new_context.list2 = list2.tail
    assert new_context.state = action.next
    return (context=&new_context)
end

func run(context : Context*, length : felt) -> (context : Context*):
    if length == 0:
        return (context=context)
    end

    tempvar action = context.state + Action.SIZE * context.value
    if action.typ == 0:
        let (context) = action0(context=context, action=action)
    else:
        let (context) = action1(context=context, action=action)
    end

    return run(context=context, length=length - 1)
end

func validate(list : List*, expected : felt, length : felt):
    if length == 0:
        assert expected = 0
        return ()
    end

    alloc_locals
    tempvar z = list.head - 1
    assert z = z * z
    validate(list=list.tail, expected=(expected - z) / 2, length=length - 1)
    return ()
end

func check_actions{range_check_ptr}(all_actions : Action*, n_actions : felt, i : felt):
    if i == 0:
        return ()
    end

    let i = i - 1

    tempvar action = all_actions + i * Action.SIZE
    assert_nn_le(action.value, VALUE_BOUND - 1)
    assert_nn_le((action.next - all_actions) / (VALUE_BOUND * Action.SIZE), AMOUNT - 1)

    return check_actions(all_actions=all_actions, n_actions=n_actions, i=i)
end

func main{output_ptr : felt*, range_check_ptr}():
    alloc_locals
    local all_actions : Action*

    let n_actions = VALUE_BOUND * AMOUNT
    check_actions(all_actions=all_actions, n_actions=n_actions, i=n_actions)

    let (local list : List*) = alloc()
    assert list.tail = list
    assert list.head = 0

    let (local context : Context*) = alloc()
    assert context.list1 = list
    assert context.list2 = list
    assert context.value = 1
    assert context.state = all_actions

    local length
    assert_nn_le(length, 600)
    local range_check_ptr = range_check_ptr
    let (context) = run(context, length)
    validate(context.list1, 24662441983, 36)

    let output_ptr = output_ptr + 1
    return ()
end
