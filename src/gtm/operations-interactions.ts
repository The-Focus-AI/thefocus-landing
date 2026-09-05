// Local concept interactions. No submission, analytics, storage, or external requests.
const field = (data: FormData, key: string) => String(data.get(key) || '').trim();
const labels: Record<string,string> = {
  operation:'Operation', consequence:'Current consequence / baseline', owner:'Decision owner',
  systems:'Systems and sources', acceptance:'Acceptance criteria', exceptions:'Human decisions',
  capacity:'Use of released capacity', timing:'Intended timing', investment:'Initial investment'
};
let generatedBrief = '';
document.querySelector<HTMLFormElement>('#brief-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget as HTMLFormElement);
  generatedBrief = '# First-project brief\n\n' + Object.entries(labels).map(([key,label])=>`## ${label}\n${field(data,key) || 'To establish'}\n`).join('\n');
  const result = document.querySelector<HTMLElement>('#brief-result');
  const output = document.querySelector<HTMLElement>('#brief-output');
  if (output) output.textContent = generatedBrief;
  if (result) {result.hidden = false; result.scrollIntoView({block:'start'});}
});
document.querySelector('#download-brief')?.addEventListener('click',()=> {
  if (!generatedBrief) return;
  const url = URL.createObjectURL(new Blob([generatedBrief],{type:'text/markdown;charset=utf-8'}));
  const a = document.createElement('a'); a.href=url; a.download='first-project-brief.md'; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const interest = new URLSearchParams(location.search).get('interest');
const interestField = document.querySelector<HTMLSelectElement>('#interest');
if (interestField && ['partner','operation','program'].includes(interest || '')) interestField.value=interest!;
document.querySelectorAll<HTMLFormElement>('form[data-preview-form]').forEach(form=>{
  form.addEventListener('submit',event=> {
    event.preventDefault();
    const result = form.parentElement?.querySelector<HTMLElement>('[data-form-result]');
    if(!result) return;
    const data = new FormData(form);
    result.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = form.dataset.previewForm === 'book' ? 'Signup preview' : 'Enquiry preview';
    result.append(heading);
    const summary = document.createElement('p');
    summary.textContent = form.dataset.previewForm === 'book'
      ? `An edition update would be requested for ${field(data,'email')}. This preview has not subscribed you.`
      : `${field(data,'name')} at ${field(data,'company')}: ${field(data,'challenge')}`;
    result.append(summary);
    const note = document.createElement('p'); note.className='micro';
    note.textContent = form.dataset.previewForm === 'book'
      ? 'No information was sent or saved. You can use the project brief now.'
      : `Timing: ${field(data,'timing')}. Initial investment: ${field(data,'budget')}. No enquiry was sent and no meeting was booked.`;
    result.append(note);
    if(form.dataset.previewForm === 'contact') {
      const next = document.createElement('p');next.textContent='The proposed next step: a 30-minute conversation to understand the workflow, assess fit, and agree whether to scope an engagement.'; result.append(next);
    }
    result.hidden=false;
    result.scrollIntoView({block:'nearest'});
  });
});
