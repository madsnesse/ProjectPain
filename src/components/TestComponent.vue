<template>
    <div class="test">
        <h1>Heines hathjørne</h1>
        <p id="jeff">My name jeff</p>
        <p id="matias">{{msg}}</p>
    </div>
</template>
<script>
export default {
    name: 'TestComponent',
    props: {
        msg: String
    }
}
</script>
<style scoped>
    h1{
        font-family: "Comic Sans MS", "Comic Sans", cursive;
    }
    #jeff{
        width: 50%;
        color: bisque;

    }
    #matias{
        width: 50%;
        color: rebeccapurple;
        outline: red;
    }
</style>