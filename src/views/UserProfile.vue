<template>
  <div class="bg-green-50 min-h-screen py-10">
    <div class="container mx-auto px-4 lg:px-6 max-w-4xl">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        User Profile
      </h1>
      
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/3 bg-green-100 p-6 flex flex-col items-center">
            <img 
              :src="user.photo || 'https://via.placeholder.com/150'" 
              alt="Profile photo"
              class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4">
            <button 
              @click="triggerFileInput"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
              Change Photo
            </button>
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileUpload"
              class="hidden"
              accept="image/*">
          </div>
          
          <div class="md:w-2/3 p-6">
            <div class="mb-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">
                Personal Information
              </h2>
              <div class="space-y-4">
                
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">
                    Username
                  </label>
                  <div class="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600">
                    {{ user.username }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input 
                    v-model="user.email"
                    type="email"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
                </div>
                
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input 
                    v-model="user.phone"
                    type="tel"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
                </div>
                
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea 
                    v-model="user.bio"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    rows="3"
                    placeholder="Tell something about yourself...">
                  </textarea>
                </div>

              </div>
            </div>
            
            <button 
              @click="saveProfile"
              class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
              Save Changes
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        username: '',
        email: '',
        phone: '',
        bio: '',
        photo: ''
      }
    }
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
        this.user = {
          username: currentUser,
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
          photo: userData.photo || ''
        };
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = {
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone,
          bio: this.user.bio,
          photo: this.user.photo
        };
        localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
      }
    }
  }
}
</script>
