<template>
    <div class="mask-login w-screen h-screen">
        <canvas id="canv"></canvas>
        <div class="box" style="background-color: rgba(255, 255, 255, 0.08);"
            :class="isLogin ? '' : 'right-panel-active'">
            <div class="form-container sign-up-container px-14">
                <h1 class="text-center font-bold text-xl mt-12 mb-4 alpha-color">{{ t('user.register') }}</h1>
                <Form :model="formDataReg" ref="formRefReg" :wrapper-col-props="{ flex: 1 }">
                    <Form.Item hide-label field="account" :rules="accountRule" class="!mb-6">
                        <Input class="py-1.5 !rounded" v-model="formDataReg.account" type="text"
                            :placeholder="t('user.phone.email')" />
                    </Form.Item>
                    <Form.Item hide-label field="code" class="!mb-6" :rules="codeRule">
                        <Input class="py-1.5 !rounded" v-model="formDataReg.code" type="text" :maxlength="6"
                            @keyup="e => formDataReg.code = e.target.value.toUpperCase()" :placeholder="t('user.code')">
                        <template #suffix>
                            <div class="text-color-auto-3 text-xs"
                                :class="regCountdown <= 0 ? 'cursor-pointer' : 'cursor-not-allowed'"
                                @click="sendCode()">
                                {{ regCountdown <= 0 ? t('user.send.code') : `${regCountdown} s` }}</div>
                        </template>
                        </Input>
                    </Form.Item>
                    <Form.Item hide-label field="pwd" class="!mb-6" :rules="pwdRule">
                        <Input class="py-1.5 !rounded" type="password" v-model="formDataReg.pwd"
                            :placeholder="t('user.pwd')" />
                    </Form.Item>
                    <Form.Item hide-label field="confirmPwd" :rules="pwdRule2">
                        <Input class="py-1.5 !rounded" type="password" v-model="formDataReg.confirmPwd"
                            :placeholder="t('user.confirm.pwd')" />
                    </Form.Item>
                </Form>
                <div class="text-center">
                    <Button type="primary" class="px-6 !rounded mt-3 w-full !h-9" @clickFn="register()">
                        {{ t('user.register') }}</Button>
                </div>
            </div>
            <div class="form-container sign-in-container px-14 relative">
                <IconFont type="icon-erweimadenglu1" :size="40" class="absolute right-3 top-3 cursor-pointer"
                    @click="toggleCodeLogin" />
                <div v-if="!isScanCode">
                    <h1 class="text-center font-bold text-xl mt-20 mb-4 alpha-color">{{ t('user.login') }}</h1>
                    <Form :model="formDataLog" ref="formRefLog" :wrapper-col-props="{ flex: 1 }">
                        <Form.Item hide-label field="account" :rules="accountRule" class="!mb-6">
                            <Input class="py-1.5 !rounded" v-model="formDataLog.account" type="text"
                                :placeholder="t('user.phone.email')" />
                        </Form.Item>
                        <Form.Item hide-label field="pwd" :rules="pwdRule" v-if="isPwdLogin">
                            <Input class="py-1.5 !rounded" v-model="formDataLog.pwd" type="password"
                                :placeholder="t('user.pwd')">
                            </Input>
                        </Form.Item>
                        <Form.Item hide-label field="code" :rules="codeRule" v-else>
                            <Input class="py-1.5 !rounded" v-model="formDataLog.code" :maxlength="6"
                                @keyup="e => formDataLog.code = e.target.value.toUpperCase()" type="text"
                                :placeholder="t('user.code')">
                            <template #suffix>
                                <div class="text-color-auto-3 text-xs"
                                    :class="logCountdown <= 0 ? 'cursor-pointer' : 'cursor-not-allowed'"
                                    @click="sendCode()">
                                    {{ logCountdown <= 0 ? t('user.send.code') : `${logCountdown} s` }}</div>
                            </template>
                            </Input>
                        </Form.Item>
                    </Form>
                    <div class="flex justify-between text-color-auto-3 text-xs">
                        <div @click="isPwdLogin = !isPwdLogin" class="cursor-pointer">{{ t(isPwdLogin ?
                'user.code.login' :
                'user.pwd.login') }}</div>
                        <div class="cursor-pointer">{{ t('user.forget.pwd') }}</div>
                    </div>
                    <div class="text-center mt-1">
                        <Button type="primary" class="px-6 !rounded mt-3 w-full !h-9" @clickFn="login()">
                            {{ t('user.login') }}</Button>
                    </div>
                </div>
                <div class="flex flex-1 flex-col items-center justify-center h-full" v-else>
                    <div class="text-xl alpha-color font-bold">{{ t('scan.with').format(t('app.name')) }}</div>
                    <QrcodeVue :value="qrcode" :margin="2" foreground="#111" class="mt-4" :size="180" level="H" />
                    <div class="mt-3 text-xs alpha-color">{{ t('scan.login').format(t('app.name')) }}</div>
                    <div class="mt-1 text-xs alpha-color">{{ t('app.admin') }}</div>
                </div>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1 class=" text-3xl text-white font-bold">{{ t('user.has.account') }}</h1>
                        <p class="mt-4 text-white break-all">{{ t('user.login.by.account') }}</p>
                        <div @click="isLogin = !isLogin"
                            class="cursor-pointer mt-3 px-5 py-0.5 text-base text-white rounded-full border border-solid border-white">
                            {{ t('user.login') }}
                        </div>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1 class=" text-3xl text-white font-bold">{{ t('user.no.account') }}</h1>
                        <p class="mt-4 text-white break-all">{{ t('user.start.join') }}</p>
                        <div @click="isLogin = !isLogin"
                            class="cursor-pointer mt-3 px-5 py-0.5 text-base text-white rounded-full border border-solid border-white">
                            {{ t('user.register') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import './index.scss'
import { Form, type FieldRule } from '@arco-design/web-vue'
import { Input, Button, IconFont } from '~/uikit'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import usePageHooks from './hooks'
import { buildRequire, emailCheck, phoneCheck } from '~/utils/validator'
import QrcodeVue from 'qrcode.vue'
//@ts-ignore
import render from './utils/index.js'
const { t } = useI18n()
const [
    { isLogin, isPwdLogin, formDataReg, formRefReg, formDataLog, formRefLog,
        logCountdown, regCountdown, isScanCode, qrcode },
    { login, register, sendCode, toggleCodeLogin }] = usePageHooks()
onMounted(() => render())

//#region rules
const accountRule: FieldRule[] = [
    buildRequire(),
    {
        validator: async (value, callback) => {
            const result = await Promise.allSettled([emailCheck(value), phoneCheck(value)])
            if (result.some(e => e.status === 'fulfilled')) callback(undefined)
            else callback(t('user.account.need'))
        },
    }
]
const pwdRule: FieldRule[] = [
    buildRequire(),
    {
        minLength: 6,
    }
]
const pwdRule2: FieldRule[] = [
    ...pwdRule,
    {
        validator: (value, callback) => {
            if (value !== formDataReg.value.pwd) callback(t('user.pwd.same'))
            else callback(undefined)
        }
    }
]
const codeRule: FieldRule[] = [
    buildRequire(),
    {
        length: 6
    }
]
//#endregion
</script>