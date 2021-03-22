<template>
    <b-container class="my-buttons">
        <b-row align-h="center">

            <b-form-group
                v-slot="{ ariaDescribedby }"
                >
                <b-form-checkbox-group
                    class = "m-2"
                    :aria-describedby="ariaDescribedby"
                    v-model="left_group"
                    stacked
                    buttons
                    :button-variant="'info'"
                >
                    <b-form-checkbox class="my-1" value="Temporal" name="check-button">
                        Temporal
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Spatial" name="check-button">
                        Spatial
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Punctate" name="check-button">
                        Punctate pressure
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Incisive" name="check-button">
                        Incisive pressure
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Constrictive" name="check-button">
                        Constrictive pressure
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="temps" name="check-button">
                        Temporary buttons
                    </b-form-checkbox>
                
                </b-form-checkbox-group>
            </b-form-group>
            <b-form-group
                v-slot="{ ariaDescribedby }"
                >
                <b-form-checkbox-group
                    class = "m-2"
                    :aria-describedby="ariaDescribedby"
                    v-model="right_group"
                    stacked
                    buttons
                    :button-variant="'info'"
                >
                    <b-form-checkbox class="my-1" value="Traction" name="check-button">
                        Traction pressure
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Thermal" name="check-button">
                        Thermal
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Brightness" name="check-button">
                        Brightness
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Sensory" name="check-button">
                        Sensory
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Evaluative" name="check-button">
                        evaluative
                    </b-form-checkbox>

                    <b-form-checkbox class="my-1" value="Hello" name="check-button">
                        Hello there
                    </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            

        </b-row>
        <b-row align-h="center">
            
            <!-- 1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5 -->
        </b-row>
        <b-row align-h="center">
            <!-- <span id="test2"></span> -->
            <!-- 1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5 -->
        </b-row>
    </b-container>
</template>


<script>
export default {
    data() {
        return {
            left_group: [], // Must be an array reference!
            right_group: [] // Must be an array reference!
            // options_one: [
            //     { text: 'Temporary', value: 'temporary' },
            //     { text: 'Temporal', value: 'temporal' },
            //     { text: 'Spatial', value: 'spatial' },
            //     { text: 'Punctate Pressure', value: 'punctate_pressure' },
            //     { text: 'Another Button', value: 'another_button' },
            //     { text: 'The', value: 'the' }
            // ],
            // options_two: [
            //     { text: 'Buttons', value: 'buttons' },
            //     { text: 'Tension', value: 'tension' },
            //     { text: 'Autonomic', value: 'autonomic' },
            //     { text: 'You get the point', value: 'you' },
            //     { text: 'Button', value: 'button' },
            //     { text: 'Hello there', value: 'hello_there' }
            // ]
        }
    }
}
</script>

<style scoped>
    .buttons{
        width: 50%;
    }
</style>