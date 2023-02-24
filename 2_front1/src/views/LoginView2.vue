<script setup>
import CardBox from "@/components/CardBox.vue";

</script>
<template>
    <div>
    <div class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                                                                                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                                                                                    alt="logo">
                                                                                                Flowbite
                                                                                            </a> -->
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div>
                            <img src='../assets/img/team_logo.png' style="height:120px; margin:auto">
                        </div>
                        <CardBox calss="mt-1">

                            <h1
                                class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
                                일단, 로그인
                            </h1>
                            <form class="space-y-4 md:space-y-6" @submit.prevent="sendPost">
                                <div>
                                    <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        아이디
                                    </label>
                                    <input v-model="f_data_l[0]" type="id" name="email" id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="아이디를 입력하세요" required="">
                                </div>
                                <div>
                                    <label for="password"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                    <input v-model="f_data_l[1]" type="password" name="password" id="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="">
                            </div>
                            <div class="flex items-center justify-between">
                                <!-- <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    required="">
                                            </div>
                                            <div class="ml-3 text-sm">
                                                                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember
                                                    me</label>
                                            </div>
                                                                        </div> -->
                                    <!-- <a href="#"
                                                                        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                                                        password?</a> -->
                                </div>
                                <button type="submit"
                                    class="w-full text-white bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    로그인</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    계정이 없으신가요? <a href="/signup"
                                        class="font-semibold text-primary-600 hover:underline dark:text-primary-500">
                                        회원가입</a>
                                </p>
                            </form>
                        </CardBox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { main_url, port } from '../config'
import axios from 'axios';
// axios.defaults.withCredentials = true;
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default {
    name: 'LoginView',
    components: {
    },
    beforeMount() {

        axios.get(main_url, { withCredentials: true })
            .then(function (response) {
                // 성공 핸들링
                console.log(response);
                if (response.data != "") {
                    window.location.href = '/dashboard'
                }
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
            .then(function () {
                // 항상 실행되는 영역
            });

    },
    data() {
        return {
            f_data_l: ['', ''],
            f_list: ['user_id', 'user_password']
        }
    },
    methods: {
        sendPost: function () {
            var host = window.location.hostname;
            var protocol = window.location.protocol;
            // var url = protocol + "//" + port + '/api/predict_all';
            var url = protocol + "//" + host + ":" + port + "/api/login";
            console.log(url);
            const frm = new FormData();
            var f_list = this.f_list;
            console.log(f_list);
            for (var step = 0; step < f_list.length; step++) {
                var to_in = this.f_data_l[step]
                frm.append(f_list[step], to_in);
            }

            axios.post(url, frm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
                .then((Response) => {
                    console.log(Response);
                    console.log(Response.data);
                    window.location.href = Response.data;

                })
                .catch((error) => {
                    console.log(error)
                })


        }
    }

}
</script>