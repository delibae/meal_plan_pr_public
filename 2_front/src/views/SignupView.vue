<script setup>
import BaseDivider from "@/components/BaseDivider.vue";

</script>
<template>
    <div>
        <div class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex- items-center justify-center px-6 py-8 mx-auto w-auto md:h-screen lg:py-0">
                <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                                                                                                                                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                                                                                                                                        alt="logo">
                                                                                                                                                    Flowbite
                                                                                                                                                </a> -->
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-50">
                            새로운 계정 생성
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit.prevent="sendPost">
                            <div class="grid grid-cols-2">
                                <div class="flex flex-col mr-6">
                                    <div>
                                        <label :for="f_data_l[0]"
                                            class="block  mt-3 mb-1 text-sm font-normal text-gray-900 dark:text-white">ID
                                        </label>
                                        <input v-model="f_data_l[0]" type="id" :name="f_data_l[0]" :id="f_data_l[0]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="아이디 입력" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[1]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                        <input v-model="f_data_l[1]" type="password" :name="f_data_l[0]" :id="f_data_l[0]"
                                            placeholder="••••••••"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[3]"
                                            class="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            이름
                                        </label>
                                        <input v-model="f_data_l[3]" type="name" :name="f_data_l[3]" :id="f_data_l[3]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="이름 입력" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[2]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            현재 나이
                                        </label>
                                        <input v-model="f_data_l[2]" type="number" :name="f_data_l[2]" :id="f_data_l[2]"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="숫자만 입력" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[4]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            성별
                                        </label>
                                        <select v-model="f_data_l[4]" :id="f_data_l[4]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required>
                                            <option value="m">남성</option>
                                            <option value="f">여성</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label :for="f_data_l[10]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            사용 목적
                                        </label>
                                        <select v-model="f_data_l[10]" :id="f_data_l[10]"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required>
                                            <option value="0">다이어트</option>
                                            <option value="1">벌크업</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <div>
                                        <label :for="f_data_l[8]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            목표 날짜
                                        </label>
                                        <input v-model="f_data_l[8]" type="date" :name="f_data_l[8]" :id="f_data_l[8]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[6]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            현재 키
                                        </label>
                                        <input v-model="f_data_l[6]" type="number" :name="f_data_l[6]" :id="f_data_l[6]"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="(예: 176)" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[5]"
                                            class="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            현재 몸무게
                                        </label>
                                        <input v-model="f_data_l[5]" type="number" :name="f_data_l[5]" :id="f_data_l[5]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="(예: 63)" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[7]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            목표 몸무게
                                        </label>
                                        <input v-model="f_data_l[7]" type="number" :name="f_data_l[7]" :id="f_data_l[7]"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="(예: 68)" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[9]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            최소 칼로리
                                        </label>
                                        <input v-model="f_data_l[9]" type="number" :name="f_data_l[9]" :id="f_data_l[9]"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="(예: 2000)" required="">
                                    </div>
                                    <div>
                                        <label :for="f_data_l[11]"
                                            class="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            활동 성향
                                        </label>
                                        <select v-model="f_data_l[11]" :id="f_data_l[11]"
                                            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required>
                                            <option value="0">비활동적 : 일상생활에 필요한 최소한의 활동만 함</option>
                                            <option value="1">저활동적 : 일상활동 + 30~60분 가량의 꾸준한 운동을 함</option>
                                            <option value="2">활동적 : 일상활동 + 60분 이상의 꾸준한 운동을 함</option>
                                            <option value="3">매우 활동적 : 일상활동 + 60분 가량의 무난한 운동 + 30~60분의 격한 운동을 함</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <BaseDivider/>
                            <div class="flex items-start">
                                <div class="flex items-center h-5 mt-3">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required="">
                                </div>
                                
                                <div class="ml-2 mt-3 text-sm">
                                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">사이트
                                        <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#">이용약관</a>에 동의합니다.</label>
                                </div>
                            </div>
                            <div style="text-align:center">
                                <button type="submit"
                                    class="w-2/5 text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    계정 생성</button>
                            </div>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                이미 계정이 있으신가요? <a href="/login"
                                    class="font-semibold text-primary-600 hover:underline dark:text-primary-500">
                                    로그인 하기</a>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// to do (태희)
import { main_url, port } from '../config'

function get_bmr(height, weight, age, gender, purpose, coefficient) {
    var bmr;
    console.log('purpose', purpose);
    console.log('coeff', coefficient);
    if (gender.toLowerCase() == 'f') {
        var activity_type = [1, 1.12, 1.27, 1.45]
        bmr = (6.25 * height) + (10 * weight) - (5 * age) - 161;
        if (purpose == 1) {
            bmr *= activity_type[coefficient];
        }
    } else {
        var activity_type = [1, 1.11, 1.25, 1.48];
        bmr = (6.25 * height) + (10 * weight) - (5 * age) + 5;
        if (purpose == 1) {
            bmr *= activity_type[coefficient];

        }
    }

    return bmr;
}
function get_kcal_per_day(energy_for_day, goal_weight, weight, goal_date) {
    console.log(goal_date);
    var today = new Date();
    var arr1 = goal_date.split('-');
    console.log(arr1);
    console.log(today);
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let day = today.getDay();  // 요일
    var arr2 = [year, month, day];



    var dat1 = new Date(arr1[0], arr1[1], arr1[2]); // 목표일
    var dat2 = new Date(arr2[0], arr2[1], arr2[2]); // 오늘




    let goal_days = Math.floor((dat1 - dat2) / (1000 * 60 * 60 * 24));
    console.log('goal_days = ' + goal_days);
    var kcal_per_day = energy_for_day - ((((weight - goal_weight) / goal_days)) * 7000);

    return kcal_per_day

}

import axios from 'axios';

export default {
    name: 'SignupView',
    components: {
    },
    data() {
        return {
            f_data_l: [],
            f_list: ['user_id', 'user_password', 'age', 'user_name', 'gender', 'current_weight', 'height', 'goal_weight', 'd_day', 'minimum_kcal', 'purpose', 'activity_co'],
            f_cal_list: ['bmr', 'kcal_per_day', 'profile_path', 'setting']
        }
    },
    beforeMount() {
        var url = main_url + ":" + port + '/api/session';
        axios.get(url, { withCredentials: true })
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
    methods: {
        sendPost: function () {

            var url = main_url + ":" + port + '/api/signup';
            console.log(url);
            console.log('f_data_l' + this.f_data_l);
            const frm = new FormData();
            var f_list = this.f_list;
            console.log(f_list);
            for (var step = 0; step < f_list.length; step++) {
                var to_in = this.f_data_l[step]
                frm.append(f_list[step], to_in);
            }
            // to do (태희)
            var bmr = get_bmr(this.f_data_l[6], this.f_data_l[5], this.f_data_l[2], this.f_data_l[4], this.f_data_l[10], this.f_data_l[11]);
            var kcal_per_day = get_kcal_per_day(bmr, this.f_data_l[7], this.f_data_l[5], this.f_data_l[8]);
            for (var step = 0; step < this.f_cal_list.length; step++) {
                var to_in = 1;
                if (step === 0) {

                    frm.append(this.f_cal_list[step], bmr);
                } else if (step === 1) {

                    frm.append(this.f_cal_list[step], kcal_per_day);

                } else {
                    frm.append(this.f_cal_list[step], to_in);
                }
            }


            console.log('frm' + frm);

            axios.post(url, frm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((Response) => {
                    console.log(Response);


                    const pro = window.location.protocol + "//" + window.location.host;

                    var r = pro + Response.data;
                    window.location.href = r;
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                })


        }
    }

}
</script>
