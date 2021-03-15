<template>
    <b-container class="my-buttons">
        <b-row align-h="center">
            

            <b-form-checkbox v-model="checked1" name="check-button" button :button-variant="!checked1 ? 'secondary' : 'success'" size="">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked2" name="check-button" button :button-variant="!checked2 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked3" name="check-button" button :button-variant="!checked3 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked4" name="check-button" button :button-variant="!checked4 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked5" name="check-button" button :button-variant="!checked5 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked6" name="check-button" button :button-variant="!checked6 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked7" name="check-button" button :button-variant="!checked7 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <b-form-checkbox v-model="checked8" name="check-button" button :button-variant="!checked8 ? 'secondary' : 'success'">
                Button Checkbox
            </b-form-checkbox>

            <!-- <span id="test"></span> -->
            <!-- 1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5 -->
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
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            checked7: false,
            checked8: false
        }
    }
}
</script>