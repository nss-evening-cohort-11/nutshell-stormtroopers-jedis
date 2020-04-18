import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobData from '../../helpers/data/jobData';

const buildEditStaffForm = (selectedStaffId) => {
  staffData.getStaffMemberById(selectedStaffId)
    .then((response) => {
      const selectedStaffMember = response.data;
      selectedStaffMember.id = selectedStaffId;
      jobData.getAllJobs().then((jobs) => {
        let domString = '';
        console.error(selectedStaffMember, jobs[0]);
        domString += '<form class="text-left d-flex flex-column justify-content-between" id="edit-staff-form">';
        domString += '    <div class="form-group">';
        domString += '        <label for="edit-staff-member-image">Edit Staff Member Image</label>';
        domString += `        <input type="text" class="form-control" id="edit-staff-member-image" placeholder="Paste updated employee image url here..." value="${selectedStaffMember.imageUrl}">`;
        domString += '    </div>';
        domString += '    <div class="form-group">';
        domString += '        <label for="edit-staff-member-name">Edit Staff Member Name</label>';
        domString += `        <input type="text" class="form-control" id="edit-staff-member-name" placeholder="Change employee name..." value="${selectedStaffMember.name}">`;
        domString += '    </div>';
        jobs.forEach((job, i) => {
          const checkCurrentJob = job.id === selectedStaffMember.jobId;
          domString += '<div class="custom-control custom-radio">';
          domString += `  <input type="radio" id="editJobRadio-${i + 1}" name="editJobRadio" class="custom-control-input" value="${job.id}" ${checkCurrentJob ? 'checked' : ''}>`;
          domString += `  <label class="custom-control-label" for="editJobRadio-${i + 1}">${job.jobType}</label>`;
          domString += '</div>';
        });
        domString += '  <button type="button" id="edit-member-button" class="m-3 btn btn-success">Save</button>';
        domString += `  <button type="button" id="delete-member-button" data-staff-id="${selectedStaffMember.id}" class="m-3 btn btn-danger">Delete</button>`;
        domString += '</form>';
        utils.printToDom('add-staff-modal-body', domString);
        $('#add-staff-modal').modal('show');
      });
    })
    .catch((err) => console.error('This shit ain\'t workin\', yo', err));
};

export default { buildEditStaffForm };