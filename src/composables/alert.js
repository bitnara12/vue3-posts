import { ref } from 'vue';

const alerts = ref([]);

export function useAlert() {
  // alert (Transition Group)
  // const alerts = ref([]);
  const vAlert = (message, type = 'error') => {
    alerts.value.push({ message, type });
    console.log(message);
    setTimeout(() => {
      alerts.value.shift();
    }, 2000);
  };
  const vSuccess = message => vAlert(message, 'success');
  return { alerts, vAlert, vSuccess };
}
