# [StarkNet](https://starkware.co/product/starknet/) is a permissionless decentralized ZK-Rollup operating
# as an L2 network over Ethereum, where any dApp can achieve
# unlimited scale for its computation, without compromising
# Ethereum's composability and security.
#
# This is a simple StarkNet contract.
# Note that you won't be able to use the playground to compile and run it,
# but you can deploy it on the [StarkNet Planets Alpha network](https://medium.com/starkware/starknet-planets-alpha-on-ropsten-e7494929cb95)!
#
# 1. Click on "Deploy" to deploy the contract.
#    For more information on how to write Cairo contracts see the
#    ["Hello StarkNet" tutorial](https://cairo-lang.org/docs/hello_starknet).
# 2. Click on the contract address in the output pane to open
#    [Voyager](https://voyager.online/) - the StarkNet block explorer.
# 3. Wait for the page to load the information
#    (it may take a few minutes until a block is created).
# 4. In the "STATE" tab, you can call the "add()" transaction.

# The "%lang" directive declares this code as a StarkNet contract.
%lang starknet

# The "%builtins" directive declares the builtins used by the contract.
# For example, the "range_check" builtin is used to compare values.
%builtins range_check

@view
func add(x : felt, y : felt) -> (res : felt):
    return (res=x + y)
end
