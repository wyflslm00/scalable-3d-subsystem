<template>
	<div class="pAnchor" :visible="visibleModel">
		<div class="tle">
			<div class="left">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="cancel">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7743 6.25564C16.0917 6.57941 16.0719 7.0856 15.73 7.38624L10.4831 12L15.73 16.6138C16.0719 16.9144 16.0917 17.4206 15.7743 17.7444C15.4568 18.0681 14.9222 18.0869 14.5803 17.7862L8 12L14.5803 6.21377C14.9222 5.91313 15.4568 5.93187 15.7743 6.25564Z" fill="#1B2129" />
				</svg>
				<span class="t1">锚点文本设置</span>
				<span class="t2">/</span>
				<span class="t3">{{ mainEquipObject.legendName || mainEquipObject.name }}</span>
			</div>

			<el-Button size="small" type="primary" @click="save">保存</el-Button>
		</div>
		<div class="cnt">
			<div class="lft">
				<div class="title">
					<span class="name"> 选择锚点 </span>
				</div>
				<div class="chartBox">
					<!-- 设备 -->
					<legend-choose ref="legendChoose" :queryBody="mainEquipObject" :anchorIsEquipment="anchorIsEquipment" @mainAnchor="getMainAnchor" v-if="mainObjectType == 'equipment'"></legend-choose>
					<!-- 立管 -->
					<stand-pipe-choose ref="standPipeChoose" :queryBody="mainEquipObject" @mainAnchor="getMainAnchor" v-if="mainObjectType == 'pipe'"></stand-pipe-choose>
					<!-- 母线 -->
					<generatrix-choose v-if="mainObjectType == 'line'"></generatrix-choose>

					<template v-if="mainObjectType != 'line'">
						<svg class="prompt" v-if="mainObjectType != 'pipe'" width="292" height="28" viewBox="0 0 292 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="292" height="28" rx="4" fill="white" />
							<path d="M50.556 8.244V9.888H46.524V10.728H50.556V12.852H45.804V13.692H49.776C48.912 15.336 47.52 16.68 45.6 17.736L46.092 18.54C48.132 17.268 49.584 15.66 50.448 13.692H50.556V19.164H51.444V13.692H51.54C52.332 15.468 53.76 17.064 55.8 18.504L56.4 17.736C54.432 16.548 53.04 15.204 52.236 13.692H56.196V12.852H51.444V10.728H55.56V9.888H51.444V8.244H50.556ZM58.932 8.424L58.332 8.988C59.148 9.624 59.784 10.224 60.252 10.8L60.84 10.2C60.324 9.612 59.688 9.024 58.932 8.424ZM57.54 11.892V12.72H59.208V17.472C59.208 17.664 59.112 17.844 58.944 18.012L59.28 18.78C60.12 18.228 60.924 17.604 61.68 16.896L61.44 15.984C60.948 16.452 60.48 16.86 60.048 17.22V11.892H57.54ZM61.8 13.296V14.136H62.46C62.796 15.18 63.408 16.116 64.32 16.956C63.42 17.592 62.304 18.108 60.972 18.504L61.452 19.236C62.856 18.804 64.044 18.24 65.004 17.52C65.844 18.168 66.9 18.732 68.148 19.236L68.616 18.492C67.44 18.06 66.444 17.568 65.628 17.004C66.504 16.188 67.128 15.216 67.512 14.088V13.296H61.8ZM63.276 14.136H66.66C66.276 15.024 65.7 15.792 64.932 16.464C64.14 15.78 63.588 15 63.276 14.136ZM62.724 8.664V9.996C62.724 10.944 62.196 11.676 61.152 12.192L61.728 12.852C62.952 12.156 63.576 11.172 63.576 9.9V9.48H65.904V11.436C65.904 12.144 66.264 12.504 67.008 12.504H68.328V11.712H67.224C66.912 11.712 66.756 11.556 66.756 11.256V8.664H62.724ZM69.852 11.592V12.252H74.424C74.376 12.48 74.34 12.708 74.292 12.936H71.376V18.228H69.636V18.924H80.376V18.228H78.636V12.936H75.156C75.204 12.72 75.24 12.492 75.288 12.252H80.16V11.592H75.384L75.456 10.896H79.344V8.652H70.656V10.896H74.592L74.52 11.592H69.852ZM72.216 18.228V17.436H77.784V18.228H72.216ZM72.216 16.896V16.14H77.784V16.896H72.216ZM72.216 15.588V14.832H77.784V15.588H72.216ZM72.216 14.292V13.536H77.784V14.292H72.216ZM78.528 10.284H76.74V9.288H78.528V10.284ZM75.948 10.284H74.052V9.288H75.948V10.284ZM73.272 10.284H71.484V9.288H73.272V10.284Z" fill="black" />
							<path d="M214.512 8.388L213.924 8.952C214.776 9.624 215.448 10.26 215.94 10.86L216.54 10.26C215.988 9.636 215.316 9.012 214.512 8.388ZM221.484 18.984H224.268L224.484 18.12C224.16 18.144 223.704 18.156 223.128 18.168C222.528 18.18 221.94 18.192 221.364 18.192C220.428 18.192 219.636 18.18 219.012 18.168C218.292 18.144 217.752 18.048 217.38 17.88C217.044 17.724 216.732 17.472 216.444 17.124C216.348 17.016 216.252 16.92 216.156 16.848V12.36H213.648V13.152H215.352V16.8C214.848 17.016 214.284 17.64 213.636 18.66L214.284 19.248C214.956 18.12 215.436 17.568 215.736 17.568C215.88 17.568 216.036 17.664 216.204 17.868C216.576 18.3 216.996 18.6 217.464 18.744C217.944 18.876 218.58 18.948 219.348 18.96C220.116 18.972 220.836 18.984 221.484 18.984ZM220.452 8.16V9.696H218.868C219.012 9.312 219.144 8.916 219.264 8.496L218.436 8.328C218.148 9.408 217.68 10.404 217.032 11.304L217.788 11.772C218.052 11.388 218.292 10.98 218.508 10.524H220.452V12.24H217.332V13.08H219.264C219.228 13.824 219.108 14.472 218.904 15C218.592 15.72 217.956 16.32 216.984 16.8L217.548 17.484C218.676 16.896 219.408 16.14 219.72 15.228C219.924 14.628 220.044 13.908 220.08 13.08H221.292V16.488C221.292 16.752 221.364 16.968 221.532 17.136C221.688 17.304 221.916 17.388 222.228 17.388H223.092C223.5 17.376 223.788 17.28 223.956 17.112C224.136 16.92 224.268 16.332 224.34 15.336L223.584 15.084C223.536 15.936 223.44 16.416 223.296 16.524C223.2 16.596 223.08 16.632 222.912 16.632H222.48C222.216 16.632 222.096 16.512 222.096 16.296V13.08H224.112V12.24H221.292V10.524H223.692V9.696H221.292V8.16H220.452ZM230.556 8.148V10.308H226.26V15.948H227.124V15.192H230.556V19.284H231.444V15.192H234.888V15.948H235.752V10.308H231.444V8.148H230.556ZM227.124 14.352V11.148H230.556V14.352H227.124ZM231.444 14.352V11.148H234.888V14.352H231.444Z" fill="black" />
							<path d="M137.02 13.632V8.832H128.14V9.672H136.144V12.804H129.484V11.028H128.62V17.328C128.62 18.312 129.1 18.816 130.072 18.816H136.576C137.08 18.792 137.476 18.66 137.74 18.408C138.028 18.096 138.232 17.208 138.352 15.72L137.512 15.456C137.44 16.776 137.284 17.544 137.044 17.76C136.864 17.904 136.624 17.976 136.336 17.976H130.312C129.76 17.976 129.484 17.7 129.484 17.172V13.632H137.02ZM140.932 8.424L140.332 8.988C141.148 9.624 141.784 10.224 142.252 10.8L142.84 10.2C142.324 9.612 141.688 9.024 140.932 8.424ZM139.54 11.892V12.72H141.208V17.472C141.208 17.664 141.112 17.844 140.944 18.012L141.28 18.78C142.12 18.228 142.924 17.604 143.68 16.896L143.44 15.984C142.948 16.452 142.48 16.86 142.048 17.22V11.892H139.54ZM143.8 13.296V14.136H144.46C144.796 15.18 145.408 16.116 146.32 16.956C145.42 17.592 144.304 18.108 142.972 18.504L143.452 19.236C144.856 18.804 146.044 18.24 147.004 17.52C147.844 18.168 148.9 18.732 150.148 19.236L150.616 18.492C149.44 18.06 148.444 17.568 147.628 17.004C148.504 16.188 149.128 15.216 149.512 14.088V13.296H143.8ZM145.276 14.136H148.66C148.276 15.024 147.7 15.792 146.932 16.464C146.14 15.78 145.588 15 145.276 14.136ZM144.724 8.664V9.996C144.724 10.944 144.196 11.676 143.152 12.192L143.728 12.852C144.952 12.156 145.576 11.172 145.576 9.9V9.48H147.904V11.436C147.904 12.144 148.264 12.504 149.008 12.504H150.328V11.712H149.224C148.912 11.712 148.756 11.556 148.756 11.256V8.664H144.724ZM151.852 11.592V12.252H156.424C156.376 12.48 156.34 12.708 156.292 12.936H153.376V18.228H151.636V18.924H162.376V18.228H160.636V12.936H157.156C157.204 12.72 157.24 12.492 157.288 12.252H162.16V11.592H157.384L157.456 10.896H161.344V8.652H152.656V10.896H156.592L156.52 11.592H151.852ZM154.216 18.228V17.436H159.784V18.228H154.216ZM154.216 16.896V16.14H159.784V16.896H154.216ZM154.216 15.588V14.832H159.784V15.588H154.216ZM154.216 14.292V13.536H159.784V14.292H154.216ZM160.528 10.284H158.74V9.288H160.528V10.284ZM157.948 10.284H156.052V9.288H157.948V10.284ZM155.272 10.284H153.484V9.288H155.272V10.284Z" fill="black" />
							<rect x="33.5" y="10.5" width="7" height="7" rx="3.5" fill="white" stroke="#246FE5" />
							<rect x="201" y="10" width="8" height="8" rx="4" fill="#246FE5" />
							<rect x="115" y="10" width="8" height="8" rx="4" fill="#A6EDE8" />
						</svg>

						<svg class="prompt" width="292" v-if="mainObjectType == 'pipe'" height="28" viewBox="0 0 292 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="292" height="28" rx="4" fill="white" />
							<path d="M50.556 8.244V9.888H46.524V10.728H50.556V12.852H45.804V13.692H49.776C48.912 15.336 47.52 16.68 45.6 17.736L46.092 18.54C48.132 17.268 49.584 15.66 50.448 13.692H50.556V19.164H51.444V13.692H51.54C52.332 15.468 53.76 17.064 55.8 18.504L56.4 17.736C54.432 16.548 53.04 15.204 52.236 13.692H56.196V12.852H51.444V10.728H55.56V9.888H51.444V8.244H50.556ZM58.932 8.424L58.332 8.988C59.148 9.624 59.784 10.224 60.252 10.8L60.84 10.2C60.324 9.612 59.688 9.024 58.932 8.424ZM57.54 11.892V12.72H59.208V17.472C59.208 17.664 59.112 17.844 58.944 18.012L59.28 18.78C60.12 18.228 60.924 17.604 61.68 16.896L61.44 15.984C60.948 16.452 60.48 16.86 60.048 17.22V11.892H57.54ZM61.8 13.296V14.136H62.46C62.796 15.18 63.408 16.116 64.32 16.956C63.42 17.592 62.304 18.108 60.972 18.504L61.452 19.236C62.856 18.804 64.044 18.24 65.004 17.52C65.844 18.168 66.9 18.732 68.148 19.236L68.616 18.492C67.44 18.06 66.444 17.568 65.628 17.004C66.504 16.188 67.128 15.216 67.512 14.088V13.296H61.8ZM63.276 14.136H66.66C66.276 15.024 65.7 15.792 64.932 16.464C64.14 15.78 63.588 15 63.276 14.136ZM62.724 8.664V9.996C62.724 10.944 62.196 11.676 61.152 12.192L61.728 12.852C62.952 12.156 63.576 11.172 63.576 9.9V9.48H65.904V11.436C65.904 12.144 66.264 12.504 67.008 12.504H68.328V11.712H67.224C66.912 11.712 66.756 11.556 66.756 11.256V8.664H62.724ZM69.852 11.592V12.252H74.424C74.376 12.48 74.34 12.708 74.292 12.936H71.376V18.228H69.636V18.924H80.376V18.228H78.636V12.936H75.156C75.204 12.72 75.24 12.492 75.288 12.252H80.16V11.592H75.384L75.456 10.896H79.344V8.652H70.656V10.896H74.592L74.52 11.592H69.852ZM72.216 18.228V17.436H77.784V18.228H72.216ZM72.216 16.896V16.14H77.784V16.896H72.216ZM72.216 15.588V14.832H77.784V15.588H72.216ZM72.216 14.292V13.536H77.784V14.292H72.216ZM78.528 10.284H76.74V9.288H78.528V10.284ZM75.948 10.284H74.052V9.288H75.948V10.284ZM73.272 10.284H71.484V9.288H73.272V10.284Z" fill="black" />
							<path d="M214.512 8.388L213.924 8.952C214.776 9.624 215.448 10.26 215.94 10.86L216.54 10.26C215.988 9.636 215.316 9.012 214.512 8.388ZM221.484 18.984H224.268L224.484 18.12C224.16 18.144 223.704 18.156 223.128 18.168C222.528 18.18 221.94 18.192 221.364 18.192C220.428 18.192 219.636 18.18 219.012 18.168C218.292 18.144 217.752 18.048 217.38 17.88C217.044 17.724 216.732 17.472 216.444 17.124C216.348 17.016 216.252 16.92 216.156 16.848V12.36H213.648V13.152H215.352V16.8C214.848 17.016 214.284 17.64 213.636 18.66L214.284 19.248C214.956 18.12 215.436 17.568 215.736 17.568C215.88 17.568 216.036 17.664 216.204 17.868C216.576 18.3 216.996 18.6 217.464 18.744C217.944 18.876 218.58 18.948 219.348 18.96C220.116 18.972 220.836 18.984 221.484 18.984ZM220.452 8.16V9.696H218.868C219.012 9.312 219.144 8.916 219.264 8.496L218.436 8.328C218.148 9.408 217.68 10.404 217.032 11.304L217.788 11.772C218.052 11.388 218.292 10.98 218.508 10.524H220.452V12.24H217.332V13.08H219.264C219.228 13.824 219.108 14.472 218.904 15C218.592 15.72 217.956 16.32 216.984 16.8L217.548 17.484C218.676 16.896 219.408 16.14 219.72 15.228C219.924 14.628 220.044 13.908 220.08 13.08H221.292V16.488C221.292 16.752 221.364 16.968 221.532 17.136C221.688 17.304 221.916 17.388 222.228 17.388H223.092C223.5 17.376 223.788 17.28 223.956 17.112C224.136 16.92 224.268 16.332 224.34 15.336L223.584 15.084C223.536 15.936 223.44 16.416 223.296 16.524C223.2 16.596 223.08 16.632 222.912 16.632H222.48C222.216 16.632 222.096 16.512 222.096 16.296V13.08H224.112V12.24H221.292V10.524H223.692V9.696H221.292V8.16H220.452ZM230.556 8.148V10.308H226.26V15.948H227.124V15.192H230.556V19.284H231.444V15.192H234.888V15.948H235.752V10.308H231.444V8.148H230.556ZM227.124 14.352V11.148H230.556V14.352H227.124ZM231.444 14.352V11.148H234.888V14.352H231.444Z" fill="black" />
							<path d="M137.02 13.632V8.832H128.14V9.672H136.144V12.804H129.484V11.028H128.62V17.328C128.62 18.312 129.1 18.816 130.072 18.816H136.576C137.08 18.792 137.476 18.66 137.74 18.408C138.028 18.096 138.232 17.208 138.352 15.72L137.512 15.456C137.44 16.776 137.284 17.544 137.044 17.76C136.864 17.904 136.624 17.976 136.336 17.976H130.312C129.76 17.976 129.484 17.7 129.484 17.172V13.632H137.02ZM140.932 8.424L140.332 8.988C141.148 9.624 141.784 10.224 142.252 10.8L142.84 10.2C142.324 9.612 141.688 9.024 140.932 8.424ZM139.54 11.892V12.72H141.208V17.472C141.208 17.664 141.112 17.844 140.944 18.012L141.28 18.78C142.12 18.228 142.924 17.604 143.68 16.896L143.44 15.984C142.948 16.452 142.48 16.86 142.048 17.22V11.892H139.54ZM143.8 13.296V14.136H144.46C144.796 15.18 145.408 16.116 146.32 16.956C145.42 17.592 144.304 18.108 142.972 18.504L143.452 19.236C144.856 18.804 146.044 18.24 147.004 17.52C147.844 18.168 148.9 18.732 150.148 19.236L150.616 18.492C149.44 18.06 148.444 17.568 147.628 17.004C148.504 16.188 149.128 15.216 149.512 14.088V13.296H143.8ZM145.276 14.136H148.66C148.276 15.024 147.7 15.792 146.932 16.464C146.14 15.78 145.588 15 145.276 14.136ZM144.724 8.664V9.996C144.724 10.944 144.196 11.676 143.152 12.192L143.728 12.852C144.952 12.156 145.576 11.172 145.576 9.9V9.48H147.904V11.436C147.904 12.144 148.264 12.504 149.008 12.504H150.328V11.712H149.224C148.912 11.712 148.756 11.556 148.756 11.256V8.664H144.724ZM151.852 11.592V12.252H156.424C156.376 12.48 156.34 12.708 156.292 12.936H153.376V18.228H151.636V18.924H162.376V18.228H160.636V12.936H157.156C157.204 12.72 157.24 12.492 157.288 12.252H162.16V11.592H157.384L157.456 10.896H161.344V8.652H152.656V10.896H156.592L156.52 11.592H151.852ZM154.216 18.228V17.436H159.784V18.228H154.216ZM154.216 16.896V16.14H159.784V16.896H154.216ZM154.216 15.588V14.832H159.784V15.588H154.216ZM154.216 14.292V13.536H159.784V14.292H154.216ZM160.528 10.284H158.74V9.288H160.528V10.284ZM157.948 10.284H156.052V9.288H157.948V10.284ZM155.272 10.284H153.484V9.288H155.272V10.284Z" fill="black" />
							<rect x="33" y="10" width="8" height="8" rx="1" fill="#D9EBFF" />
							<rect x="201" y="10" width="8" height="8" rx="1" fill="#246FE5" />
							<rect x="115" y="10" width="8" height="8" rx="1" fill="#CBF7F3" />
						</svg>
					</template>
				</div>
			</div>
			<div class="content">
				<div class="attr" v-if="mainObjectType != 'pipe' && mainObjectType != 'line'">
					<div class="title">
						<span class="name"> 锚点属性 </span>
					</div>
					<div class="cv">
						<span class="s1">动态/静态锚点</span>
						<el-radio-group v-model="anchorIsMultiple" :disabled="JSON.stringify(mainAnchor) == '{}'">
							<el-radio :label="true" @change="changeAnchorIsMultiple">动态锚点</el-radio>
							<el-radio :label="false" @change="changeAnchorIsMultiple">静态锚点</el-radio>
						</el-radio-group>
					</div>
					<div class="cv">
						<span class="s1">是否配设备类</span>
						<el-radio-group v-model="anchorIsEquipment" :disabled="!anchorIsMultiple">
							<el-radio :label="true" @change="changeAnchorIsEquipment">是</el-radio>
							<el-radio :label="false" @change="changeAnchorIsEquipment">否</el-radio>
						</el-radio-group>
					</div>
					<div class="cv">
						<span class="s1">配设备类</span>
						<el-Button size="mini" @click="addPairEquipFun" :disabled="!anchorIsEquipment">添加配设备</el-Button>

						<!-- 添加配设备 -->
						<add-anchor-equipment :visible.sync="vis_addPairEquip" :options.sync="mainAnchor" :selectList="equipments" @confirm="getAddAnchorEquipment"></add-anchor-equipment>
					</div>
					<div class="filter" v-if="equipments.length && anchorIsEquipment">
						<div class="cv">
							<span class="s1">已过滤设置</span>
							<div class="eq_c">
								<template v-for="(item, i) in equipments">
									<div class="eq-o" v-if="item.dataFilterInitialized" :key="'ygl' + i">
										<span class="s_name">{{ item.name }}</span>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="setEquipFilter(item)">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M8.18379 4.37537L8.23212 4.31021C8.59691 3.8184 9.40355 3.41553 10.0269 3.41553C11.1183 3.41553 12.0008 4.31026 12.0008 5.41111C12.0008 6.00066 11.7457 6.54851 11.3145 6.92373L7.15068 11.2804C6.93606 11.505 6.63894 11.632 6.32831 11.632H5.02817C4.39992 11.632 3.89062 11.1227 3.89062 10.4945V9.31246C3.89062 9.01813 4.00471 8.73525 4.20892 8.52327L7.50547 5.10118L8.18379 4.37537ZM8.56364 5.19263L8.11452 5.67318L8.11018 5.67776L4.81144 9.10212C4.75699 9.15865 4.72656 9.23408 4.72656 9.31257V10.4946C4.72656 10.6621 4.86237 10.7979 5.02991 10.7979H6.33005C6.41288 10.7979 6.49212 10.7641 6.54935 10.7042L10.23 6.85299L8.56364 5.19263ZM10.0261 4.24976C10.6542 4.24976 11.1657 4.76844 11.1657 5.41114C11.1657 5.66414 11.0861 5.90306 10.9448 6.09865L9.1875 4.55016C9.44294 4.37931 9.78045 4.24976 10.0261 4.24976Z" fill="#424C59" />
											<path d="M4 12.5C4 12.2239 4.18851 12 4.42105 12H11.5789C11.8115 12 12 12.2239 12 12.5C12 12.7761 11.8115 13 11.5789 13H4.42105C4.18851 13 4 12.7761 4 12.5Z" fill="#424C59" />
										</svg>
										<el-popconfirm @confirm="delPairEquip(item.id)" confirm-button-text="删除" confirm-button-type="danger" cancel-button-type="" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此设备删除后，相关锚点设置都会清空，确定删除吗？">
											<svg slot="reference" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99964 7.33334L11.333 4.00001L11.9996 4.66667L8.66631 8.00001L11.9996 11.3333L11.333 12L7.99964 8.66667L4.66631 12L3.99964 11.3333L7.33297 8.00001L3.99964 4.66667L4.66631 4.00001L7.99964 7.33334Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M11.333 4.28285L7.99964 7.61618L4.66631 4.28285L4.28248 4.66667L7.61582 8.00001L4.28248 11.3333L4.66631 11.7172L7.99964 8.38383L11.333 11.7172L11.7168 11.3333L8.38346 8.00001L11.7168 4.66667L11.333 4.28285Z" fill="#424C59" />
											</svg>
										</el-popconfirm>
									</div>
								</template>
							</div>
						</div>
						<div class="cv">
							<span class="s1">未过滤设置</span>
							<div class="eq_c">
								<template v-for="(item, i) in equipments">
									<div class="eq-o" v-if="!item.dataFilterInitialized" :key="'wgl' + i">
										<span class="s_name">{{ item.name }}</span>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="setEquipFilter(item)">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M8.18379 4.37537L8.23212 4.31021C8.59691 3.8184 9.40355 3.41553 10.0269 3.41553C11.1183 3.41553 12.0008 4.31026 12.0008 5.41111C12.0008 6.00066 11.7457 6.54851 11.3145 6.92373L7.15068 11.2804C6.93606 11.505 6.63894 11.632 6.32831 11.632H5.02817C4.39992 11.632 3.89062 11.1227 3.89062 10.4945V9.31246C3.89062 9.01813 4.00471 8.73525 4.20892 8.52327L7.50547 5.10118L8.18379 4.37537ZM8.56364 5.19263L8.11452 5.67318L8.11018 5.67776L4.81144 9.10212C4.75699 9.15865 4.72656 9.23408 4.72656 9.31257V10.4946C4.72656 10.6621 4.86237 10.7979 5.02991 10.7979H6.33005C6.41288 10.7979 6.49212 10.7641 6.54935 10.7042L10.23 6.85299L8.56364 5.19263ZM10.0261 4.24976C10.6542 4.24976 11.1657 4.76844 11.1657 5.41114C11.1657 5.66414 11.0861 5.90306 10.9448 6.09865L9.1875 4.55016C9.44294 4.37931 9.78045 4.24976 10.0261 4.24976Z" fill="#424C59" />
											<path d="M4 12.5C4 12.2239 4.18851 12 4.42105 12H11.5789C11.8115 12 12 12.2239 12 12.5C12 12.7761 11.8115 13 11.5789 13H4.42105C4.18851 13 4 12.7761 4 12.5Z" fill="#424C59" />
										</svg>

										<el-popconfirm @confirm="delPairEquip(item.id)" confirm-button-text="删除" confirm-button-type="danger" cancel-button-type="" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此设备删除后，相关锚点设置都会清空，确定删除吗？">
											<svg slot="reference" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99964 7.33334L11.333 4.00001L11.9996 4.66667L8.66631 8.00001L11.9996 11.3333L11.333 12L7.99964 8.66667L4.66631 12L3.99964 11.3333L7.33297 8.00001L3.99964 4.66667L4.66631 4.00001L7.99964 7.33334Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M11.333 4.28285L7.99964 7.61618L4.66631 4.28285L4.28248 4.66667L7.61582 8.00001L4.28248 11.3333L4.66631 11.7172L7.99964 8.38383L11.333 11.7172L11.7168 11.3333L8.38346 8.00001L11.7168 4.66667L11.333 4.28285Z" fill="#424C59" />
											</svg>
										</el-popconfirm>

										<!-- <svg slot="reference" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="delPairEquip(item.id)">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99964 7.33334L11.333 4.00001L11.9996 4.66667L8.66631 8.00001L11.9996 11.3333L11.333 12L7.99964 8.66667L4.66631 12L3.99964 11.3333L7.33297 8.00001L3.99964 4.66667L4.66631 4.00001L7.99964 7.33334Z" fill="#424C59" />
											<path fill-rule="evenodd" clip-rule="evenodd" d="M11.333 4.28285L7.99964 7.61618L4.66631 4.28285L4.28248 4.66667L7.61582 8.00001L4.28248 11.3333L4.66631 11.7172L7.99964 8.38383L11.333 11.7172L11.7168 11.3333L8.38346 8.00001L11.7168 4.66667L11.333 4.28285Z" fill="#424C59" />
										</svg> -->
									</div>
								</template>
							</div>

							<!-- 配设备过滤设置 -->
							<rxfilter :visible.sync="vis_rxfilter" :options="curRxfilterEquip" @confirm="finishEquipFilter"></rxfilter>
						</div>
					</div>
				</div>
				<div class="equip">
					<div class="tle">
						<div class="title">
							<span class="name"> 连接设备 </span>
						</div>
						<el-Button size="mini" @click="addConnectEquipFun">新增连接设备</el-Button>
						<!-- 添加设备 -->
						<add-device :visible.sync="vis_addDevice" :equipList="equipList" @checkedEquipment="getCheckedConnectEquip"></add-device>
					</div>
					<div class="eq_cnt">
						<el-tabs v-model="checkedMainObject.name" @tab-click="mainTabsChange" v-if="equipments.length && anchorIsEquipment">
							<el-tab-pane :label="item.name" :name="item.id" v-for="(item, i) in equipments" :key="'ljsb' + i">用户管理</el-tab-pane>
						</el-tabs>

						<div class="tree">
							<div v-if="connectTreeList.length && ((checkedMainObject.name == '' && !anchorIsEquipment) || (checkedMainObject.name != '' && anchorIsEquipment))" class="structure">
								<div v-for="(one, oneIndex) in connectTreeList" :key="one.key">
									<div class="one-box" :style="{ background: !!one.selected ? '#D9EBFF' : '' }">
										<i
											v-if="one.childNode && one.childNode.length"
											@click="
												one.hidden = !one.hidden;
												$set(connectTreeList, oneIndex, one);
											"
											:style="{ transform: !one.hidden ? 'rotate(90deg)' : 'rotate(0)' }"
											class="el-icon-caret-right"
										></i>
										<!-- 一级标题 -->
										<span class="name" @click.stop="changeTreeRootNode(oneIndex, one)">
											{{ one.name }}
											<span class="relation" v-if="one.relName">{{ one.relName }}</span>
											<span class="relation" v-if="one.relIndirectName">>> {{ one.relIndirectName }}</span>
										</span>
										<el-popconfirm @confirm="deleteTreeRootNode(oneIndex, one)" confirm-button-type="danger" cancel-button-type="" confirm-button-text="删除" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此设备删除后，相关锚点设置都会清空，确定删除吗？">
											<i slot="reference" class="icon el-icon-close" @click.stop=""></i>
										</el-popconfirm>
										<!-- <i class="icon el-icon-close" @click.stop="deleteTreeRootNode(oneIndex, one)"></i> -->
									</div>
									<div class="two-tem" v-for="(two, towIndex) in one.childNode" :key="one.key + towIndex">
										<div class="two-box" v-if="!one.hidden" :style="{ background: !!two.selected ? '#D9EBFF' : '' }">
											<i
												v-if="two.childNode && two.childNode.length && two.anchorIsEquipment"
												@click="
													two.hidden = !two.hidden;
													$set(connectTreeList[oneIndex].childNode, towIndex, two);
												"
												class="el-icon-caret-right"
												:style="{ transform: !two.hidden ? 'rotate(90deg)' : 'rotate(0)' }"
											></i>
											<!-- 二级标题 -->
											<span class="name" @click.stop="changeTreeRootNodeTwo([oneIndex, towIndex], two)">
												{{ two.code || two.typeName }}
												<span class="relation" v-if="two.relName">{{ two.relName }}</span>
												<span class="relation inRelation" v-if="two.relIndirectName">{{ two.relIndirectName }}</span>
											</span>
											<el-popconfirm v-if="two.multiple" @confirm="deleteTreeRootNodeChildTow(towIndex, two)" confirm-button-type="danger" cancel-button-type="" confirm-button-text="删除" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此设备删除后，相关锚点设置都会清空，确定删除吗？">
												<i slot="reference" class="icon el-icon-close" @click.stop=""></i>
											</el-popconfirm>
											<i v-else class="icon el-icon-close" @click="deleteTreeRootNodeChildTow(towIndex, two)"></i>
											<!-- <i class="icon el-icon-close" @click="deleteTreeRootNodeChildTow(towIndex, two)"></i> -->
										</div>

										<template v-if="!two.hidden">
											<template v-if="!one.hidden">
												<template v-if="two.anchorIsEquipment">
													<template v-for="(three, threeIndex) in two.childNode">
														<div class="three-tem" :key="'three' + threeIndex">
															<div class="three-box" v-if="three.relName || three.relIndirectName">
																<!-- 三级标题 -->
																<span @click.stop="changeTreeRootNodeTwo([oneIndex, towIndex], two)">
																	{{ three.name }}
																	<span class="relation" v-if="three.relName">{{ three.relName }}</span>
																	<span class="relation inRelation" v-if="three.relIndirectName">{{ three.relIndirectName }}</span>
																</span>
																<i class="icon el-icon-close" @click="deleteTreeRootNodeChildThree(two, three)"></i>
															</div>
														</div>
													</template>
												</template>
											</template>
										</template>

										<!-- {{ two }} -->
									</div>
								</div>
							</div>

							<div v-else class="noMore">
								<img src="@/assets/images/no_template.png" alt="" />
								<p>暂无连接设备</p>
							</div>
						</div>

						<!-- {{ connectTreeList }} -->
					</div>
				</div>
			</div>
			<div class="rht">
				<template v-if="JSON.stringify(connectEquipObject) != '{}'">
					<div class="title">
						<span class="name"> 编辑锚点 </span>
					</div>
					<div class="chartBox">
						<legend-anchor-edit v-if="connectEquipObject.objectType == 'equipment'" :queryBody="connectEquipObject" @allAnchor="getConnectAnchor"></legend-anchor-edit>
						<stand-pipe-edit v-if="connectEquipObject.objectType == 'pipe'" :queryBody="connectEquipObject" @allAnchor="getConnectAnchor"></stand-pipe-edit>
						<generatrix-choose v-if="connectEquipObject.objectType == 'line'"></generatrix-choose>
						<div class="objName">{{ connectEquipObject.name }}</div>
					</div>

					<!-- {{ connectEquipObject }} -->

					<el-tabs v-model="checkedSubObject.name" @tab-click="subTabsChange">
						<template v-for="(item, i) in checkedAnchors">
							<el-tab-pane :label="item.code || item.typeName" :name="item.code || item.id" v-if="item.checked" :key="'mk' + i"></el-tab-pane>
						</template>
					</el-tabs>

					<div class="dt" v-if="JSON.stringify(curAnchors) != '{}' && this.curAnchors.multiple">
						<div class="dt_eq" v-for="(item, i) in curAnchors.equipments" :key="'dt' + i">
							<span class="eq_xl">配设备{{ i + 1 }}</span>
							<div class="line"></div>
							<span class="eq_name">{{ item.name }}</span>
							<div>
								<span class="eq_type"
									>设备类：<template v-for="cn in item.classNames">{{ cn }}</template></span
								>
							</div>
							<div class="line"></div>
							<div class="gx">
								<span>选择关系</span>
								<!-- :disabled="item.relClassCodeList.length ? true : false" -->
								<el-button type="text" @click="changeIndirect(item)">＋ 编辑间接关系</el-button>
							</div>
							<el-Cascader :ref="'relCascader_' + i" :options="item.relClassCodeList" v-model="item.defaultRelModel" @change="changeRelClassCode('relCascader_' + i, item)" :disabled="item.relClassCodeList.length ? false : true"></el-Cascader>
							<div class="gx">
								<span>关系方向</span>
								<el-radio-group @input="changeDirection($event, item.directions, i, item)" v-model="item.directionName" size="mini">
									<el-radio-button :label="Number(radio.code)" v-for="radio in item.directions">
										<template v-if="radio.code == '99'"> 无 </template>
										<template v-else-if="radio.code == '0'"> — </template>
										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '1'">
											<path d="M7.46484 1.46387L11.0005 4.9995L7.46484 8.53514" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.5 4.96387H0.999724" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '2'">
											<path d="M4.53516 1.46436L0.99952 4.99999L4.53516 8.53563" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M1.5 4.96436H11.0003" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '3'">
											<path d="M3.41797 1.30664L0.725106 3.9995L3.41797 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M8.57812 1.30664L11.271 3.9995L8.57812 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.3867 3.96387H0.886442" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>
									</el-radio-button>
								</el-radio-group>
								<!-- {{ item.directions }} -->
								<!--{{ item.directionName }} -->
							</div>

							<div class="gx" v-if="item.hasPipe">
								<span>查询步数</span>
							</div>
							<div class="gx_c" v-if="item.hasPipe">
								<el-radio-group v-model="item.pipeStepLimited" @change="changeStepOrRiser(i, item)">
									<el-radio :label="false">不限</el-radio>
									<el-radio :label="true">1步</el-radio>
								</el-radio-group>
							</div>
							<div class="gx" v-if="item.hasPipe">
								<span>是否允许路过立管</span>
							</div>
							<div class="gx_c" v-if="item.hasPipe">
								<el-radio-group v-model="item.pipeRiserLimited" @change="changeStepOrRiser(i, item)">
									<el-radio :label="false">允许</el-radio>
									<el-radio :label="true">不允许</el-radio>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="jt" v-if="JSON.stringify(curAnchors) != '{}' && !this.curAnchors.multiple">
						<div v-for="(item, i) in curAnchors.equipments" :key="'jt' + i">
							<div class="gx">
								<span>选择关系</span>
								<!-- :disabled="item.relClassCodeList.length ? true : false" -->
								<el-button type="text" @click="changeIndirect(item)">＋ 编辑间接关系</el-button>
							</div>
							<el-Cascader :ref="'relCascader_' + i" :options="item.relClassCodeList" v-model="item.defaultRelModel" @change="changeRelClassCode('relCascader_' + i, item)" :disabled="item.relClassCodeList.length ? false : true"></el-Cascader>
							<div class="gx">
								<span>关系方向</span>
								<el-radio-group @input="changeDirection($event, item.directions, i, item)" v-model="item.directionName" size="mini">
									<el-radio-button :label="Number(radio.code)" v-for="radio in item.directions">
										<template v-if="radio.code == '99'"> 无 </template>
										<template v-else-if="radio.code == '0'"> — </template>
										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '1'">
											<path d="M7.46484 1.46387L11.0005 4.9995L7.46484 8.53514" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.5 4.96387H0.999724" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '2'">
											<path d="M4.53516 1.46436L0.99952 4.99999L4.53516 8.53563" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M1.5 4.96436H11.0003" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '3'">
											<path d="M3.41797 1.30664L0.725106 3.9995L3.41797 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M8.57812 1.30664L11.271 3.9995L8.57812 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.3867 3.96387H0.886442" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>
									</el-radio-button>
								</el-radio-group>

								<!-- {{ item.directions }}
								{{ item.directionName }} -->
							</div>
							<div class="gx" v-if="item.hasPipe">
								<span>查询步数</span>
							</div>

							<div class="gx_c" v-if="item.hasPipe">
								<el-radio-group v-model="item.pipeStepLimited" @change="changeStepOrRiser(i, item)">
									<el-radio :label="false">不限</el-radio>
									<el-radio :label="true">1步</el-radio>
								</el-radio-group>
							</div>
							<div class="gx" v-if="item.hasPipe">
								<span>是否允许路过立管</span>
							</div>
							<div class="gx_c" v-if="item.hasPipe">
								<el-radio-group v-model="item.pipeRiserLimited" @change="changeStepOrRiser(i, item)">
									<el-radio :label="false">允许</el-radio>
									<el-radio :label="true">不允许</el-radio>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="jt" v-if="JSON.stringify(curAnchors) != '{}' && curAnchors.objectType == 'line'">
						<div>
							<div class="gx">
								<span>选择关系</span>
								<!-- :disabled="curAnchors.relClassCodeList.length ? true : false" -->
								<el-button type="text" @click="changeIndirect(curAnchors)">＋ 编辑间接关系</el-button>
							</div>
							<el-Cascader ref="relCascader_line" :options="curAnchors.relClassCodeList" v-model="curAnchors.defaultRelModel" @change="changeRelClassCode('relCascader_line', curAnchors)" :disabled="curAnchors.relClassCodeList.length ? false : true"></el-Cascader>
							<div class="gx">
								<span>关系方向</span>
								<el-radio-group @input="changeDirection($event, curAnchors.directions, 0, curAnchors)" v-model="curAnchors.directionName" size="mini">
									<el-radio-button :label="Number(radio.code)" v-for="radio in curAnchors.directions">
										<template v-if="radio.code == '99'"> 无 </template>
										<template v-else-if="radio.code == '0'"> — </template>
										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '1'">
											<path d="M7.46484 1.46387L11.0005 4.9995L7.46484 8.53514" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.5 4.96387H0.999724" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '2'">
											<path d="M4.53516 1.46436L0.99952 4.99999L4.53516 8.53563" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M1.5 4.96436H11.0003" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>

										<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '3'">
											<path d="M3.41797 1.30664L0.725106 3.9995L3.41797 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M8.57812 1.30664L11.271 3.9995L8.57812 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
											<path d="M10.3867 3.96387H0.886442" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
										</svg>
									</el-radio-button>
								</el-radio-group>
								<!-- {{ curAnchors.directions }} -->
								<!-- {{ curAnchors.directionName }} -->
							</div>

							<div class="gx" v-if="curAnchors.hasPipe">
								<span>查询步数</span>
							</div>
							<div class="gx_c" v-show="curAnchors.hasPipe">
								<el-radio-group v-model="curAnchors.pipeStepLimited" @change="changeStepOrRiser(i, curAnchors)">
									<el-radio :label="false">不限</el-radio>
									<el-radio :label="true">1步</el-radio>
								</el-radio-group>
							</div>
							<div class="gx" v-if="curAnchors.hasPipe">
								<span>是否允许路过立管</span>
							</div>
							<div class="gx_c" v-show="curAnchors.hasPipe">
								<el-radio-group v-model="curAnchors.pipeRiserLimited" @change="changeStepOrRiser(i, curAnchors)">
									<el-radio :label="false">允许</el-radio>
									<el-radio :label="true">不允许</el-radio>
								</el-radio-group>
							</div>
						</div>
					</div>

					<!-- {{ curAnchors }} -->

					<to-indirect :visible.sync="vis_indirect" :options="indirectOptions" @confirm="getIndirect"></to-indirect>
				</template>
				<div v-else class="noMore">
					<img src="@/assets/images/no_template.png" alt="" />
					<p>暂无锚点</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";
import AddAnchorEquipment from "@/components/anchorEquipment/add.vue";
import Rxfilter from "@/components/anchorRxfilter/rxfilter.vue";
import LegendChoose from "@/components/legendChoose.vue";
import StandPipeChoose from "@/components/standPipeChoose.vue";
import LegendAnchorEdit from "@/components/legendAnchorEdit.vue";
import StandPipeEdit from "@/components/standPipeEdit.vue";
import AddDevice from "./addDevice.vue";
import ToIndirect from "@/components/toIndirect/index.vue";
import GeneratrixChoose from "@/components/generatrixChoose.vue";

export default {
	components: {
		LegendChoose,
		AddAnchorEquipment,
		Rxfilter,
		StandPipeChoose,
		LegendAnchorEdit,
		AddDevice,
		StandPipeEdit,
		ToIndirect,
		GeneratrixChoose,
	},
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		// 设备列表 ， 中间需包含 锚点信息
		equipObject: {
			type: Object,
		},
		mainObjectType: {
			type: String,
			default: "",
		},
	},
	computed: {
		visibleModel: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit("update:visible", false);
			},
		},
	},
	data() {
		return {
			curHeight: "",

			switchSave: false,
			switchSaveState: false,
			vis_addPairEquip: false,
			vis_rxfilter: false,
			vis_addDevice: false,
			vis_indirect: false,
			indirectOptions: {},
			indirectEquipId: "",

			defaultProps: {
				children: "childNode",
				label: "name",
			},

			checkedMainObject: {
				name: "",
			},
			checkedSubObject: {
				name: "",
			},

			//////////////////////////////////////////////////////

			mainEquipObject: {},
			mainAnchor: {},

			anchorIsMultiple: false, // true-动态   false-静态
			anchorIsEquipment: false, // 是否配对   true-是  false-否
			equipments: [],
			curRxfilterEquip: {}, // 当前过滤设备

			connectEquipObject: {}, // 临时右侧设备类对象
			connectTreeList: [], // main 的某个设备下连接的设备列表
			checkedAnchors: [],
			curAnchors: {}, // 当前要选中的锚点

			/////////////////////////////////////////////////////

			editObject: {},
			allEquipList: [],
			equipList: [],
		};
	},
	filters: {
		formatTree(data) {
			const handleData = (list = [], path) => {
				if (!list.length) return [];
				let result = [];
				list.forEach((item, index) => {
					const link = path ? `${path}-${index + 1}` : `${index + 1}`;
					if (item?.childNode?.length) {
						const arr = handleData(item.childNode, link);
						if (arr.length) {
							result.push({
								...item,
								path: link,
								childNode: arr,
							});
						}
					} else {
						result.push({
							...item,
							path: link,
						});
					}
				});
				console.log(result);
				return result;
			};
			return handleData(_.cloneDeep(data));
		},
	},
	methods: {
		async cancel() {
			let anchorList = [];
			if (this.mainObjectType == "equipment") {
				anchorList = await this.selectAnchorState();
			}
			const state = await this.$msgbox
				.confirm("数据还未保存，确定离开吗?", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "info",
				})
				.catch(() => {});
			if (state == "confirm") {
				await this.updateAnchorState(anchorList);
				this.visibleModel = false;
			}
		},
		async selectAnchorState() {
			const params = {
				templateId: this.$route.query.templateid,
				operate: "text-line",
				containerId: this.mainEquipObject.containerId,
			};
			let anchorList = [];
			await GetAdmData.getAnchorsTexts(params).then((result) => {
				if (result.result == "success") {
					const keys = Object.keys(result.data.anchorDetailMap);
					keys.map((x) => {
						result.data.anchorDetailMap[x].code = x;
						anchorList.push(result.data.anchorDetailMap[x]);
					});
				}
			});
			return anchorList;
		},
		async updateAnchorState(anchorList) {
			const self = this;
			if (anchorList.length) {
				Promise.all(
					anchorList.map(async function (anchor) {
						if (anchor.equipment && !anchor.equipments.length) {
							const params = {
								operate: "anchor-set",
								templateId: self.mainEquipObject.templateId,
								containerId: self.mainEquipObject.containerId,
								anchorCode: anchor.code,
								anchorIsMultiple: anchor.multiple,
								anchorIsEquipment: false,
							};
							await GetAdmData.anchorDetailModify(params).then((result) => {
								if (result.result == "success") {
								}
							});
						}
					})
				);
			}
		},
		async save() {
			let paramsList = [];

			this.equipments.map((item) => {
				item.allEquip &&
					item.allEquip.map((all_quip) => {
						if (all_quip.objectType == "line" && (all_quip.defaultRelModel || all_quip.relChain)) {
							paramsList = paramsList.concat(this.getLineParams(item, all_quip));
						}

						if (all_quip.childNode && all_quip.childNode.length) {
							all_quip.childNode.map((anchor) => {
								let list = anchor.anchorIsEquipment ? anchor.childNode : anchor.equipments;

								list.map((anchorEquip) => {
									if ((anchor.defaultRelModel && anchor.defaultRelModel.length) || (anchor.relIndirectChain && anchor.relIndirectChain.length) || (anchorEquip.defaultRelModel && anchorEquip.defaultRelModel.length) || (anchorEquip.relIndirectChain && anchorEquip.relIndirectChain.length)) {
										let tc1 = {};
										let tc2 = {};
										let classCodeList = [];
										let matchFiltersList = []; // 如果没有过滤条件  那就传 [[],[],[]]
										let relChainFilter = [];
										let relTypeList = [];

										let matchIndirectFiltersList = [];
										let relIndirectChainFilter = [];
										let relIndirectTypeList = [];

										let graphTypeName = anchorEquip.graphTypeName || anchorEquip?.indirectLine?.graphTypeName || "";
										let relTypeName = anchorEquip.relTypeName || anchorEquip?.indirectLine?.relTypeName || "";

										if (anchorEquip.objectType == "pipe") {
											anchorEquip = _.cloneDeep(all_quip.childNode.filter((x) => x.id == anchorEquip.id)[0]);
										}

										if (this.mainObjectType == "pipe" || this.mainObjectType == "line") {
											tc1 = {
												mainPipeId: this.mainAnchor.id,
											};
										} else {
											tc1 = {
												containerId: this.mainAnchor.containerId,
												anchorCode: this.mainAnchor.anchorCode,
											};
										}
										if (this.anchorIsEquipment) tc1.anchorEquipmentId = item.id;

										if (anchorEquip.objectType == "pipe") {
											tc2 = {
												mainPipeId: anchor.key || anchor.id,
											};
										} else {
											tc2 = {
												containerId: all_quip.containerId,
												anchorCode: anchor.anchorCode || anchor.code,
											};
										}
										if (anchor.anchorIsEquipment) tc2.anchorEquipmentId = anchorEquip.id;

										// classCode
										{
											classCodeList.push(item.classCode || item.classCodes[0]);
											classCodeList.push(anchorEquip.classCode || anchorEquip.classCodes[0]);
										}

										// matchFiltersList   relChainFilter   relTypeList
										if (anchorEquip.defaultRelModel && anchorEquip.defaultRelModel.length) {
											matchFiltersList = [[], []];

											let relFilter = this.anchorIsEquipment
												? {
														relObjType: "anchorEquipment",
														relObjId: item.id,
														classCode: item.classCodes[0],
												  }
												: {
														relObjType: this.mainObjectType == "pipe" ? "dynVar" : "container",
														relObjId: this.mainObjectType == "pipe" ? this.mainAnchor.fatherId : this.mainAnchor.containerId,
														classCode: this.mainAnchor.classCode,
												  };
											relChainFilter.push(relFilter);

											let relFilter1 = anchor.anchorIsEquipment
												? {
														relObjType: "anchorEquipment",
														relObjId: anchorEquip.id,
														classCode: anchorEquip.classCode || anchorEquip.classCodes[0],
												  }
												: {
														relObjType: anchorEquip.objectType == "pipe" ? "dynVar" : "container",
														relObjId: anchorEquip.objectType == "pipe" ? anchorEquip.fatherId : anchorEquip.key || all_quip.containerId,
														classCode: anchorEquip.classCode || anchorEquip.classCodes[0],
												  };
											relChainFilter.push(relFilter1);

											let relType = {
												code: anchorEquip.defaultRelModel[0] + "/" + anchorEquip.defaultRelModel[1],
												name: "",
												direction: anchorEquip.directionName || anchorEquip.direction || (anchorEquip.direction ? anchorEquip.direction.code : ""),
											};
											if (anchorEquip.hasOwnProperty("pipeStepLimited")) relType.pipeStepLimited = anchorEquip.pipeStepLimited;
											if (anchorEquip.hasOwnProperty("pipeRiserLimited")) relType.pipeRiserLimited = anchorEquip.pipeRiserLimited;
											relTypeList.push(relType);
										}

										if (anchorEquip.relIndirectChain && anchorEquip.relIndirectChain.length) {
											for (let i = 0; i < anchorEquip.relIndirectChain.length; i++) {
												matchIndirectFiltersList.push([]);

												if (i == 0) {
													let relFilter = this.anchorIsEquipment
														? {
																relObjType: "anchorEquipment",
																relObjId: item.id,
																classCode: item.classCodes[0],
														  }
														: { relObjType: this.mainObjectType == "pipe" ? "dynVar" : this.mainObjectType == "line" ? "mainPipe" : "container", relObjId: this.mainEquipObject.containerId || this.mainAnchor.fatherId || item.id, classCode: this.mainEquipObject.classCode || this.mainAnchor.equipmentTypes[0] };
													relIndirectChainFilter.push(relFilter);
												} else if (i == anchorEquip.relIndirectChain.length - 1) {
													let relFilter1 = anchor.anchorIsEquipment
														? {
																relObjType: "anchorEquipment",
																relObjId: anchorEquip.id,
																classCode: anchorEquip.classCode || anchorEquip.classCodes[0],
														  }
														: {
																relObjType: anchorEquip.relIndirectChain[i].typeCode == "pipe" ? "dynVar" : "container",
																relObjId: anchorEquip.relIndirectChain[i].typeCode == "pipe" ? anchor.key : anchorEquip.containerId || all_quip.containerId || anchor.fatherId,
																classCode: anchorEquip.classCode || anchorEquip.classCodes[0] || anchor.equipmentTypes[0],
														  };
													relIndirectChainFilter.push(relFilter1);
												} else {
													relIndirectChainFilter.push({
														relObjType: "object",
														relObjId: anchorEquip.relIndirectChain[i].classCode,
														classCode: anchorEquip.relIndirectChain[i].classCode,
													});
												}

												if (i != 0) {
													let relTypeList = anchorEquip.indirectLine ? anchorEquip.indirectLine.relTypeList[i - 1] : undefined;
													let relType = {
														code: anchorEquip.relIndirectChain[i].relationCode || (relTypeList ? relTypeList.code : ""),
														name: "",
														direction: anchorEquip.relIndirectChain[i].directionName || (relTypeList ? relTypeList.direction : ""),
													};
													if (anchorEquip.relIndirectChain[i].hasOwnProperty("pipeStepLimited")) relType.pipeStepLimited = anchorEquip.relIndirectChain[i]?.pipeStepLimited || (relTypeList ? relTypeList.pipeStepLimited : "");
													if (anchorEquip.relIndirectChain[i].hasOwnProperty("pipeRiserLimited")) relType.pipeRiserLimited = anchorEquip.relIndirectChain[i]?.pipeRiserLimited || (relTypeList ? relTypeList.pipeRiserLimited : "");

													relIndirectTypeList.push(relType);
												}
											}
										}

										if (relChainFilter.length && relTypeList.length) {
											let params = {
												line: {
													graphTypeName: "",
													relTypeName: "",
													templateConnector1: tc1,
													templateConnector2: tc2,
													classCodeList: classCodeList,
													matchFiltersList: matchFiltersList,
													relChainFilter: relChainFilter,
													relTypeList: relTypeList,
												},
											};
											if (anchorEquip.line && anchorEquip.line.id != "") {
												params.line.id = anchorEquip.line.id;
											}

											paramsList.push(params);
										}

										if (relIndirectChainFilter.length && relIndirectTypeList.length) {
											let params = {
												line: {
													graphTypeName: graphTypeName,
													relTypeName: relTypeName,
													templateConnector1: tc1,
													templateConnector2: tc2,
													classCodeList: classCodeList,
													matchFiltersList: matchIndirectFiltersList,
													relChainFilter: relIndirectChainFilter,
													relTypeList: relIndirectTypeList,
												},
											};
											if (anchorEquip.indirectLine && anchorEquip.indirectLine.id != "") {
												params.line.id = anchorEquip.indirectLine.id;
											}

											paramsList.push(params);
										}
									}
								});
							});
						}
					});
			});

			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});

			let self = this;
			let lines = [];
			paramsList.map((item) => {
				item.line.relTypeList.map((x) => {
					if (x.direction == "99") x.direction = "";
				});
				lines.push(item.line);
			});
			if (!lines.length) {
				this.$loading().close();

				if (!this.switchSave) {
					this.visibleModel = false;
				}
				this.switchSaveState = true;
				return this.$message({
					message: "保存成功",
					type: "success",
				});
			}
			let params = {
				templateId: this.$route.query.templateid,
				operate: "lines_update",
				containerId: this.mainAnchor.containerId,
				lines: lines,
			};
			const { result, data } = await GetAdmData.anchorsModify(params);

			if (data.success == false || result == "fail") {
				self.$message.error({
					showClose: true,
					message: "锚点设置错误," + data.error,
					duration: 0,
					type: "error",
				});
			}

			if (result == "success" && data.success != false) {
				this.$message({
					message: "保存成功",
					type: "success",
				});

				if (this.mainEquipObject.objectType == "equipment") {
					// 修改锚点状态
					let anchorList = await this.selectAnchorState();
					await this.updateAnchorState(anchorList);
				}
				if (!this.switchSave) {
					this.visibleModel = false;
				}

				this.switchSave = false;
				this.switchSaveState = true;
				if (this.mainObjectType == "equipment") this.$refs.legendChoose.setHistoryAnchorComplete(this.mainAnchor);
				if (this.mainObjectType == "pipe") this.$refs.standPipeChoose.setHistoryPipeComplete(this.mainAnchor);
			} else {
				this.switchSaveState = false;
			}
			this.$loading().close();
		},
		getLineParams(item, all_quip) {
			let paramsList = [];
			let tc1 = {};
			let tc2 = {};
			let classCodeList = [];
			let matchFiltersList = []; // 如果没有过滤条件  那就传 [[],[],[]]
			let relChainFilter = [];
			let relTypeList = [];

			let matchIndirectFiltersList = [];
			let relIndirectChainFilter = [];
			let relIndirectTypeList = [];

			let graphTypeName = all_quip.graphTypeName || all_quip?.indirectLine?.graphTypeName || "";
			let relTypeName = all_quip.relTypeName || all_quip?.indirectLine?.relTypeName || "";

			if (this.mainObjectType == "pipe" || this.mainObjectType == "line") {
				tc1 = {
					mainPipeId: this.mainAnchor.id,
				};
			} else {
				tc1 = {
					containerId: this.mainAnchor.containerId,
					anchorCode: this.mainAnchor.anchorCode,
				};
			}
			if (this.anchorIsEquipment) tc1.anchorEquipmentId = item.id;

			tc2 = {
				mainPipeId: all_quip.id,
			};

			// classCode
			{
				classCodeList.push(item.classCode || item.classCodes[0]);
				classCodeList.push(all_quip.classCode);
			}

			if (all_quip.defaultRelModel && all_quip.defaultRelModel.length) {
				matchFiltersList = [[], []];

				let relFilter = this.anchorIsEquipment
					? {
							relObjType: "anchorEquipment",
							relObjId: item.id,
							classCode: item.classCodes[0],
					  }
					: {
							relObjType: this.mainObjectType == "pipe" ? "dynVar" : "container",
							relObjId: this.mainObjectType == "pipe" ? this.mainAnchor.fatherId : this.mainAnchor.containerId,
							classCode: this.mainAnchor.classCode,
					  };
				relChainFilter.push(relFilter);

				let relFilter1 = {
					relObjType: "mainPipe",
					relObjId: all_quip.id,
					classCode: all_quip.classCode,
				};
				relChainFilter.push(relFilter1);

				let relType = {
					code: all_quip.defaultRelModel[0] + "/" + all_quip.defaultRelModel[1],
					name: "",
					direction: all_quip.directionName || all_quip.direction || (all_quip.direction ? all_quip.direction.code : ""),
				};
				if (all_quip.hasOwnProperty("pipeStepLimited")) relType.pipeStepLimited = all_quip.pipeStepLimited;
				if (all_quip.hasOwnProperty("pipeRiserLimited")) relType.pipeRiserLimited = all_quip.pipeRiserLimited;
				relTypeList.push(relType);
			}

			if (all_quip.relIndirectChain && all_quip.relIndirectChain.length) {
				for (let i = 0; i < all_quip.relIndirectChain.length; i++) {
					matchIndirectFiltersList.push([]);

					if (i == 0) {
						let relFilter = this.anchorIsEquipment
							? {
									relObjType: "anchorEquipment",
									relObjId: item.id,
									classCode: item.classCodes[0],
							  }
							: { relObjType: this.mainObjectType == "pipe" ? "dynVar" : this.mainObjectType == "line" ? "mainPipe" : "container", relObjId: this.mainEquipObject.containerId || this.mainAnchor.fatherId || item.id, classCode: this.mainEquipObject.classCode || this.mainAnchor.equipmentTypes[0] };
						relIndirectChainFilter.push(relFilter);
					} else if (i == all_quip.relIndirectChain.length - 1) {
						let relFilter1 = all_quip.anchorIsEquipment
							? {
									relObjType: "anchorEquipment",
									relObjId: all_quip.id,
									classCode: all_quip.classCode || all_quip.classCodes[0],
							  }
							: {
									relObjType: "mainPipe",
									relObjId: all_quip.id,
									classCode: all_quip.classCode,
							  };
						relIndirectChainFilter.push(relFilter1);
					} else {
						relIndirectChainFilter.push({
							relObjType: "object",
							relObjId: all_quip.relIndirectChain[i].classCode,
							classCode: all_quip.relIndirectChain[i].classCode,
						});
					}

					if (i != 0) {
						let relTypeList = all_quip.indirectLine ? all_quip.indirectLine.relTypeList[i - 1] : undefined;
						let relType = {
							code: all_quip.relIndirectChain[i].relationCode || (relTypeList ? relTypeList.code : ""),
							name: "",
							direction: all_quip.relIndirectChain[i].directionName || (relTypeList ? relTypeList.direction : ""),
						};
						if (all_quip.relIndirectChain[i].hasOwnProperty("pipeStepLimited")) relType.pipeStepLimited = all_quip.relIndirectChain[i]?.pipeStepLimited || (relTypeList ? relTypeList.pipeStepLimited : "");
						if (all_quip.relIndirectChain[i].hasOwnProperty("pipeRiserLimited")) relType.pipeRiserLimited = all_quip.relIndirectChain[i]?.pipeRiserLimited || (relTypeList ? relTypeList.pipeRiserLimited : "");

						relIndirectTypeList.push(relType);
					}
				}
			}

			if (relChainFilter.length && relTypeList.length) {
				let params = {
					line: {
						graphTypeName: "",
						relTypeName: "",
						templateConnector1: tc1,
						templateConnector2: tc2,
						classCodeList: classCodeList,
						matchFiltersList: matchFiltersList,
						relChainFilter: relChainFilter,
						relTypeList: relTypeList,
					},
				};
				if (all_quip.line && all_quip.line.id != "") {
					params.line.id = all_quip.line.id;
				}

				paramsList.push(params);
			}

			if (relIndirectChainFilter.length && relIndirectTypeList.length) {
				let params = {
					line: {
						graphTypeName: graphTypeName,
						relTypeName: relTypeName,
						templateConnector1: tc1,
						templateConnector2: tc2,
						classCodeList: classCodeList,
						matchFiltersList: matchIndirectFiltersList,
						relChainFilter: relIndirectChainFilter,
						relTypeList: relIndirectTypeList,
					},
				};
				if (all_quip.indirectLine && all_quip.indirectLine.id != "") {
					params.line.id = all_quip.indirectLine.id;
				}

				paramsList.push(params);
			}

			return paramsList; //all_quip
		},
		changeIndirect(item) {
			this.vis_indirect = true;
			this.indirectOptions = [];

			let opt = [];
			let options = {};

			if (item.objectType == "pipe" && this.curAnchors.relIndirectChain && this.curAnchors.relIndirectChain.length) {
				opt = this.curAnchors.relIndirectChain;
				if (item.indirectLine && item.indirectLine.relChainFilter) {
					opt = [];
					for (let i = 0; i < item.indirectLine.relChainFilter.length; i++) {
						const element = item.indirectLine.relChainFilter[i];
						opt.push({
							relObjId: element.classCode,
							name: element.name,
							classCode: element.classCode,
							relationCode: "",
							// directionName: item.line ? item.line.relTypeList[i - 1].direction : "",
						});
						if (i != 0) {
							opt[i].directionName = item.indirectLine.relTypeList[i - 1].direction;
							opt[i].relationCode = item.indirectLine.relTypeList[i - 1]?.code || "";
							if (item.indirectLine.relTypeList[i - 1].hasOwnProperty("pipeStepLimited")) opt[i].pipeStepLimited = item.indirectLine.relTypeList[i - 1]?.pipeStepLimited;
							if (item.indirectLine.relTypeList[i - 1].hasOwnProperty("pipeRiserLimited")) opt[i].pipeRiserLimited = item.indirectLine.relTypeList[i - 1].pipeRiserLimited;
						}
					}
					options = {
						graphTypeName: item.indirectLine.graphTypeName,
						relTypeName: item.indirectLine.relTypeName,
						relChainList: opt,
					};
				}
			} else if (item.relIndirectChain && item.relIndirectChain.length && !item.indirectLine) {
				opt = item.relIndirectChain;
				options = {
					graphTypeName: item.graphTypeName,
					relTypeName: item.relTypeName,
					relChainList: opt,
				};
			} else if (item.indirectLine && item.indirectLine.relChainFilter) {
				for (let i = 0; i < item.indirectLine.relChainFilter.length; i++) {
					const element = item.indirectLine.relChainFilter[i];
					opt.push({
						relObjId: element.classCode,
						name: element.name,
						classCode: element.classCode,
						relationCode: "",
						// directionName: item.line ? item.line.relTypeList[i - 1].direction : "",
					});
					if (i != 0) {
						opt[i].directionName = item.indirectLine.relTypeList[i - 1].direction;
						opt[i].relationCode = item.indirectLine.relTypeList[i - 1]?.code || "";
						if (item.indirectLine.relTypeList[i - 1].hasOwnProperty("pipeStepLimited")) opt[i].pipeStepLimited = item.indirectLine.relTypeList[i - 1]?.pipeStepLimited;
						if (item.indirectLine.relTypeList[i - 1].hasOwnProperty("pipeRiserLimited")) opt[i].pipeRiserLimited = item.indirectLine.relTypeList[i - 1].pipeRiserLimited;
					}
				}
				options = {
					graphTypeName: item.indirectLine.graphTypeName,
					relTypeName: item.indirectLine.relTypeName,
					relChainList: opt,
				};
			} else if (!item.relClassCodeList.length && item.indirectLine && item.indirectLine.length) {
				opt = [];
				item.indirectLine.map((x) => {
					opt.push({
						relObjId: x.classCode,
						name: x.name,
						classCode: x.classCode,
						relationCode: "",
						directionName: x.directionName,
					});
				});
			} else {
				opt.push({
					relObjId: this.mainEquipObject.classCode || this.mainAnchor.classCode,
					name: this.mainEquipObject.legendName || this.mainAnchor.typeName,
					classCode: this.mainEquipObject.classCode || this.mainAnchor.classCode,
					relationCode: "",
				});
				opt.push({
					relObjId: this.connectEquipObject.classCode || item.classCode,
					name: this.connectEquipObject.name,
					classCode: this.connectEquipObject.classCode || item.classCode,
					relationCode: "",
				});

				options = {
					graphTypeName: "",
					relTypeName: "",
					relChainList: opt,
				};
			}

			if (this.anchorIsEquipment) {
				const arr = this.equipments.filter((x) => x.id == this.checkedMainObject.name);

				if (arr.length) {
					opt[0].relObjId = arr[0].classCodes[0];
					opt[0].name = arr[0].name;
					opt[0].classCode = arr[0].classCodes[0];
				} else {
					opt[0].relObjId = item.indirectLine.classCodeList[0];
					opt[0].classCode = item.indirectLine.classCodeList[0];
				}
				options = {
					graphTypeName: item.indirectLine?.graphTypeName,
					relTypeName: item.indirectLine?.relTypeName,
					relChainList: opt,
				};
			}
			if (this.mainObjectType == "line") {
				options.relChainList[0].relObjId = this.mainAnchor.classCode || this.mainAnchor.equipmentTypes[this.mainAnchor.equipmentTypes.length - 1];
				options.relChainList[0].name = this.mainAnchor.name;
				options.relChainList[0].classCode = this.mainAnchor.classCode || this.mainAnchor.equipmentTypes[this.mainAnchor.equipmentTypes.length - 1];
			}

			if (this.curAnchors.anchorIsEquipment) {
				options.relChainList[options.relChainList.length - 1].relObjId = item.classCodes[0];
				options.relChainList[options.relChainList.length - 1].name = item.name;
				options.relChainList[options.relChainList.length - 1].classCode = item.classCodes[0];
			}

			this.indirectEquipId = item.id;
			this.indirectOptions = options;
		},
		// 动态/静态锚点设置
		changeAnchorIsMultiple(bool) {
			if (this.mainObjectType != "pipe") {
				if (!bool) this.anchorIsEquipment = bool;
				const params = {
					operate: "anchor-set",
					templateId: this.mainAnchor.templateId,
					containerId: this.mainAnchor.containerId,
					anchorCode: this.mainAnchor.anchorCode,
					anchorIsMultiple: bool,
					anchorIsEquipment: this.anchorIsEquipment,
				};
				GetAdmData.anchorDetailModify(params).then((result) => {
					if (result.result == "success") {
						const anchorCode = this.mainAnchor.anchorCode;
						if (this.mainEquipObject.objectType == "equipment") {
							this.mainEquipObject.legend.legendContent.anchors.map((x) => {
								if (x.code == anchorCode) {
									x.multiple = bool;
									x.checked = true;
								}
							});
						}

						this.getMainAnchor(this.mainAnchor);
					}
				});
			}
		},
		// 是否配设备类
		changeAnchorIsEquipment(bool) {
			if (this.mainObjectType != "pipe") {
				this.equipments = [];
				const params = {
					operate: "anchor-set",
					templateId: this.mainAnchor.templateId,
					containerId: this.mainAnchor.containerId,
					anchorCode: this.mainAnchor.anchorCode,
					anchorIsMultiple: this.anchorIsMultiple,
					anchorIsEquipment: bool,
				};
				GetAdmData.anchorDetailModify(params).then((result) => {
					if (result.result == "success") {
						this.getMainAnchor(this.mainAnchor);
					}
				});
			}
		},
		// 添加配对设备 btn
		addPairEquipFun() {
			this.vis_addPairEquip = true;
		},
		// 删除配对设备
		delPairEquip(equipId) {
			const params = {
				operate: "anchor-equipment-delete",
				templateId: this.mainAnchor.templateId,
				containerId: this.mainAnchor.containerId,
				anchorCode: this.mainAnchor.anchorCode,
				anchorEquipmentId: equipId,
			};
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			GetAdmData.anchorDetailModify(params).then((result) => {
				if (result.result == "success") {
					this.equipments = _.remove(this.equipments, function (x) {
						return x.id != result.data.anchorEquipmentId;
					});
					if (result.data.anchorEquipmentId == this.checkedMainObject.name) {
						this.connectTreeList = [];
						this.checkedAnchors = [];
						this.curAnchors = {};
					}
					this.$message({
						message: "删除成功",
						type: "success",
					});
				}
				this.$loading().close();
			});
		},
		getIndirect(data) {
			const id = this.checkedMainObject.name;
			const relChainList = data.relChainList;
			const graphTypeName = data.graphTypeName;
			const relTypeName = data.relTypeName;

			if (this.curAnchors.objectType == "line") {
				this.curAnchors.relIndirectChain = relChainList;
				this.curAnchors.relIndirectName = "间接关系";
				this.curAnchors.graphTypeName = graphTypeName;
				this.curAnchors.relTypeName = relTypeName;
			}

			this.connectTreeList = this.connectTreeList.map((item) => {
				if (item.childNode == undefined) item.childNode = [];

				if (item.objectType == "line" && item.key == this.curAnchors.key) {
					this.equipments.map((element) => {
						for (let i = 0; i < element.allEquip.length; i++) {
							if (element.allEquip[i].key == item.key) {
								element.allEquip[i] = _.cloneDeep(this.curAnchors);
								item = _.cloneDeep(this.curAnchors);
							}
						}
					});
				}

				if (item.containerId == this.curAnchors.key || (item.id == this.curAnchors.fatherId && item.id != undefined)) {
					let flag = false;
					item.childNode.map((child) => {
						if ((child.code == this.curAnchors.code && child.code != undefined) || (this.curAnchors.id == child.id && this.curAnchors.id != undefined)) {
							if (child.anchorIsEquipment) {
								child.childNode.map((x) => {
									if (x.id == this.indirectEquipId) {
										x.relIndirectChain = relChainList;
										x.relIndirectName = "间接关系";
										x.graphTypeName = graphTypeName;
										x.relTypeName = relTypeName;
									}
								});
								child.equipments.map((x) => {
									if (x.id == this.indirectEquipId) {
										x.relIndirectChain = relChainList;
										x.relIndirectName = "间接关系";
										x.graphTypeName = graphTypeName;
										x.relTypeName = relTypeName;
									}
								});
								this.curAnchors.childNode.map((x) => {
									if (x.id == this.indirectEquipId) {
										x.relIndirectChain = relChainList;
										x.relIndirectName = "间接关系";
										x.graphTypeName = graphTypeName;
										x.relTypeName = relTypeName;
									}
								});
								this.curAnchors.equipments.map((x) => {
									if (x.id == this.indirectEquipId) {
										x.relIndirectChain = relChainList;
										x.relIndirectName = "间接关系";
										x.graphTypeName = graphTypeName;
										x.relTypeName = relTypeName;
									}
								});
								flag = true;
							} else {
								this.curAnchors.relIndirectChain = relChainList;
								this.curAnchors.relIndirectName = "间接关系";
								this.curAnchors.graphTypeName = graphTypeName;
								this.curAnchors.relTypeName = relTypeName;

								this.curAnchors.equipments[0].relIndirectChain = relChainList;
								this.curAnchors.equipments[0].relIndirectName = "间接关系";
								this.curAnchors.equipments[0].graphTypeName = graphTypeName;
								this.curAnchors.equipments[0].relTypeName = relTypeName;

								child = _.merge(child, this.curAnchors);
								child.relIndirectChain = relChainList;
								child.graphTypeName = graphTypeName;
								child.relTypeName = relTypeName;
								flag = true;
							}
						}
					});

					// for (let i = 0; i < item.childNode.length; i++) {
					//     const child = item.childNode[i];
					//     if ((child.code == this.curAnchors.code && child.code != undefined) || (this.curAnchors.id == child.id && this.curAnchors.id != undefined)) {
					// 		if (child.anchorIsEquipment) {
					// 			child.childNode.map((x) => {
					// 				if (x.id == this.indirectEquipId) {
					// 					x.relChain = relChainList;
					// 					x.relName = "间接关系";
					// 				}
					// 			});
					// 			this.curAnchors.childNode.map((x) => {
					// 				if (x.id == this.indirectEquipId) {
					// 					x.relChain = relChainList;
					// 					x.relName = "间接关系";
					// 				}
					// 			});
					// 			flag = true;
					// 		} else {
					// 			this.curAnchors.relChain = relChainList;
					// 			this.curAnchors.relName = "间接关系";
					// 			child = _.merge(child, this.curAnchors);
					// 			child.relChain = relChainList;
					// 			flag = true;
					// 		}
					// 	}
					// }

					if (!flag) {
						this.curAnchors.relIndirectChain = relChainList;
						this.curAnchors.relIndirectName = "间接关系";
						this.curAnchors.graphTypeName = graphTypeName;
						this.curAnchors.relTypeName = relTypeName;

						this.curAnchors.equipments[0].relIndirectChain = relChainList;
						this.curAnchors.equipments[0].relIndirectName = "间接关系";
						this.curAnchors.equipments[0].graphTypeName = graphTypeName;
						this.curAnchors.equipments[0].relTypeName = relTypeName;

						item.childNode.push(_.cloneDeep(this.curAnchors));
						item.relIndirectChain = relChainList;
						item.graphTypeName = graphTypeName;
						item.relTypeName = relTypeName;
					}

					this.equipments.map((element) => {
						if (element.containerId === id || element.id === id || id.length === 0) {
							for (let i = 0; i < element.allEquip.length; i++) {
								if (element.allEquip[i].key == item.key) {
									element.allEquip[i].childNode = item.childNode;
									element.allEquip[i].relIndirectChain = relChainList;
									element.allEquip[i].graphTypeName = graphTypeName;
									element.allEquip[i].relTypeName = relTypeName;
								}
							}
						}
					});
				}
				return item;
			});
		},
		setEquipFilter(item) {
			this.vis_rxfilter = true;
			const params = {
				containerId: this.mainAnchor.containerId,
				containerName: this.mainAnchor.legendName,
				operate: "anchor-filter",
				templateId: this.mainAnchor.templateId,
				anchorCode: this.mainAnchor.anchorCode,
				anchorEquipmentId: item.id,
				anchorEquipmentName: item.name,
			};
			this.curRxfilterEquip = params;
		},
		finishEquipFilter() {
			const params = {
				operate: "anchor-detail",
				templateId: this.mainAnchor.templateId,
				containerId: this.mainAnchor.containerId,
				anchorCode: this.mainAnchor.anchorCode,
			};
			GetAdmData.getAnchorDetail(params).then((result) => {
				if (result.result == "success") {
					this.equipments = _.merge(this.equipments, result.data.anchorDetail.equipments);
				}
				this.vis_rxfilter = false;
			});
		},
		// 新增连接设备 btn
		addConnectEquipFun() {
			if (JSON.stringify(this.mainAnchor) == "{}") return this.$message.error("请先选择锚点");
			if (this.anchorIsEquipment) {
				if (this.checkedMainObject.name == "" || this.checkedMainObject.name == "0") {
					return this.$message.error("请先选择连接设备");
				}
				if (!this.equipList.length) this.equipList = _.cloneDeep(this.allEquipList);
			} else {
				this.equipList = _.cloneDeep(this.equipments[0].allEquip ? this.equipments[0].allEquip : this.allEquipList);
			}
			this.vis_addDevice = true;
		},
		getCheckedConnectEquip(list) {
			const id = this.checkedMainObject.name;

			if (this.anchorIsEquipment) {
				this.equipments.map((item) => {
					if (item.id != id) return;

					if (!item.allEquip) item.allEquip = [];
					item.allEquip = _.merge(item.allEquip, list);

					if (!this.connectTreeList || !this.connectTreeList.length) {
						this.connectTreeList = _.merge(
							this.connectTreeList,
							list.filter((x) => x.checked == true)
						);
					} else {
						// 合并两个数据
						let arr = _.cloneDeep(list);
						arr.map((x) => {
							let obj = this.connectTreeList.filter((y) => x.key == y.key);
							x.childNode = obj.length ? _.cloneDeep(obj[0].childNode) : [];
						});

						// let arr = _.merge(this.connectTreeList, list);
						arr.map((item) => {
							item.checked = false;
						});
						list.map((lst) => {
							if (!lst.checked) return;
							arr.map((m) => {
								if (m.containerId == lst.containerId) {
									m.checked = true;
								}
							});
						});
						this.connectTreeList = arr.filter((x) => x.checked);

						// 放入 equipments

						item.allEquip = _.cloneDeep(arr);
					}
				});
			} else {
				this.equipments.map((item) => {
					if (!item.allEquip) item.allEquip = [];
					item.allEquip = _.merge(item.allEquip, list);
				});
				const chkList = list.filter((x) => x.checked);
				chkList.map((item) => {
					let flag = this.connectTreeList.filter((x) => x.key == item.key).length;
					if (!flag) this.connectTreeList.push(_.cloneDeep(item));
				});
			}

			for (let i = 0; i < this.connectTreeList.length; i++) {
				const element = this.connectTreeList[i];
				if (list.filter((x) => x.key == element.key && x.checked == false).length) {
					this.connectTreeList.splice(i, 1);
					this.deleteTreeRootNode("", element);
					i--;
				}
			}
		},
		async mainTabsChange(tab, event) {
			const id = tab.name;
			this.connectEquipObject = {};
			this.connectTreeList = [];
			this.checkedAnchors = [];
			this.curAnchors = {};
			this.curHeight = "";
			this.equipments.map((item) => {
				if (item.id != id) return;

				if (item.allEquip == undefined) item.allEquip = _.cloneDeep(this.allEquipList);
				this.connectTreeList = _.cloneDeep(item.allEquip.filter((x) => x.checked));
				this.equipList = _.cloneDeep(item.allEquip);
			});
		},
		async subTabsChange(tab, event) {
			const id = tab.name;
			let flag = false;
			const self = this;

			if (tab.objectType == "line") {
				const arr = this.equipments.filter((x) => x.id == this.checkedMainObject.name);
				let params = {
					classCodeTo: tab.classCode,
				};

				params["classCodeFrom"] = arr.length ? arr[0].classCode || arr[0].classCodes[0] : this.mainEquipObject.classCode;
				const { result, data } = await GetAdmData.getClassCode(params);
				if (result == "success") {
					data.forEach((item) => {
						item["label"] = item.name;
						item["value"] = item.graphCode;

						item.children.forEach((child) => {
							child["label"] = child.name;
							child["value"] = child.relCode;
						});
					});
					tab.relClassCodeList = data;

					if (tab.defaultRelModel && tab.defaultRelModel.length) {
						data.forEach((t) => {
							if (t.value == tab.defaultRelModel[0]) {
								t.children.forEach((b) => {
									b.directions.map((dir) => {
										if (dir.code == "0") dir.name = "—";
									});
									if (!b.directions.filter((x) => x.code == "").length) b.directions.unshift({ code: "99", name: "无" });
									if (b.value == tab.defaultRelModel[1]) {
										tab.directions = b.directions;
										tab.direction = b.directions.filter((dir) => dir.code == tab.line.relTypeList[0].direction)[0];
										tab.directionName = tab.directionName || (tab?.line?.relTypeList.length == 1 ? tab?.line?.relTypeList.direction : "99");
										tab.hasPipe = b.hasPipe;
									}
								});
							}
						});
					}

					this.curAnchors = _.cloneDeep(tab);
					flag = true;
				}
			}

			await Promise.all(
				self.connectTreeList.map(async function (eq) {
					if (self.connectEquipObject.containerId == eq.containerId || self.connectEquipObject.key == eq.key) {
						await Promise.all(
							eq.childNode.map(async function (child) {
								if (child.code == id || child.id == id) {
									if (!child.anchorIsEquipment) {
										child.equipments.map((x) => {
											x.defaultRelModel = child.defaultRelModel;
										});
									} else {
										const arr = self.equipments.filter((x) => x.id == self.checkedMainObject.name);
										if (arr.length) {
											await Promise.all(
												child.equipments.map(async function (x) {
													if (!x.relChain && !x.relClassCodeList.length) {
														const iddd = arr[0].id;
														let params = {
															classCodeFrom: arr[0].classCode || arr[0].classCodes[0],
															classCodeTo: x.classCode || x.classCodes[0],
														};
														const { result, data } = await GetAdmData.getClassCode(params);
														if (result == "success") {
															data.forEach((item) => {
																item["label"] = item.name;
																item["value"] = item.graphCode;

																item.children.forEach((child) => {
																	child["label"] = child.name;
																	child["value"] = child.relCode;
																});
															});
															x.relClassCodeList = data;
														}
													}
												})
											);
										}
									}

									self.curAnchors = _.cloneDeep(child);
									flag = true;
								}
							})
						);
					}
				})
			);

			if (!flag) {
				let var1 = this.checkedAnchors.filter((x) => x.code == id || x.id == id)[0];
				var1.relClassCodeList = [];
				var1.defaultRelModel = [];
				this.curAnchors = var1;
				this.selectConnectAnchorDetail();
			}
		},
		// 查询被连设备 6.5.1.锚点详情-查询
		async selectConnectAnchorDetail() {
			const params = {
				operate: "anchor-detail",
				templateId: this.$route.query.templateid,
				containerId: this.connectEquipObject.containerId,
				anchorCode: this.curAnchors.anchorCode || this.curAnchors.code,
			};
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			let marker = {};
			const self = this;

			if (this.connectEquipObject.objectType == "pipe") {
				let var1 = _.cloneDeep(this.curAnchors);
				var1.checked = true;
				marker = {
					...var1,
					key: var1.id,
					anchorIsMultiple: false, // true-动态   false-静态
					anchorIsEquipment: false, // 是否配对   true-是  false-否
					equipments: _.merge([], [var1]),

					// childNode: _.merge([], [this.curAnchors]),
				};
			} else {
				await GetAdmData.getAnchorDetail(params).then((result) => {
					if (result.result == "success") {
						const detail = result.data.anchorDetail;
						if (!detail.equipment) {
							detail.equipments = [];
						}

						if (detail.equipments.length) {
							marker = {
								...this.curAnchors,
								key: this.connectEquipObject.containerId,
								anchorIsMultiple: detail.multiple, // true-动态   false-静态
								anchorIsEquipment: detail.equipment, // 是否配对   true-是  false-否
								equipments: detail.equipments,
							};
						} else {
							marker = {
								...this.curAnchors,
								key: this.connectEquipObject.containerId,
								anchorIsMultiple: detail.multiple, // true-动态   false-静态
								anchorIsEquipment: detail.equipment, // 是否配对   true-是  false-否
								equipments: _.merge([], [this.connectEquipObject]),
							};
							if (detail.multiple) {
								marker.childNode = _.merge([], [this.connectEquipObject]);
							}
						}
					}
				});
			}

			await Promise.all(
				marker.equipments.map(async function (equip) {
					const rel = await self.getRelFromToClassCode(equip);
					rel.forEach((item) => {
						item["label"] = item.name;
						item["value"] = item.graphCode;

						item.children.forEach((child) => {
							child["label"] = child.name;
							child["value"] = child.relCode;
						});
					});
					equip.relClassCodeList = rel;
				})
			);
			if (!marker.childNode) marker.childNode = _.cloneDeep(marker.equipments);

			this.curAnchors = _.cloneDeep(marker);
			this.connectTreeList.map((x) => {
				if (x.key == this.curAnchors.key && !x.childNode.length && x.childNode.length != this.curAnchors.childNode.length) {
					x.childNode = [_.cloneDeep(this.curAnchors)];

					// TODO 吴云飞
					this.equipments.map((y) => {
						if (y.id == this.checkedMainObject.name) {
							y.allEquip.map((z) => {
								if (z.key == x.key) {
									z = _.cloneDeep(x);
								}
							});
						}
					});
				}
			});
			this.$loading().close();
		},
		// 查询关系
		async getRelFromToClassCode(equip, line) {
			let params = {
				classCodeFrom: this.mainAnchor.classCode,
				classCodeTo: equip.classCode || equip.classCodes[0],
			};
			if (this.mainObjectType == "line") {
				params.classCodeFrom = this.mainAnchor.equipmentTypes[this.mainAnchor.equipmentTypes.length - 1];
			}
			if (this.anchorIsEquipment) {
				const arr = this.equipments.filter((x) => x.id == this.checkedMainObject.name);

				if (arr.length) {
					params.classCodeFrom = arr[0].classCodes[0];
				} else {
					params.classCodeFrom = line ? line.classCodeList[0] : params.classCodeFrom;
				}
			}
			const { result, data } = await GetAdmData.getClassCode(params);
			if (result == "fail") {
				this.$message.error("系统关系查询出错,请刷新后再次尝试!");
				return [];
			}
			return data;
		},
		changeRelClassCode(ref, data) {
			const id = this.checkedMainObject.name;
			let relName = [];
			let hasPipe = false;
			let directions = [];
			if (ref != "relCascader_line") {
				if (!this.$refs[ref][0].getCheckedNodes().length && relName != "relCascader_line") return;
			}

			relName = ref == "relCascader_line" ? this.$refs[ref].getCheckedNodes()[0].pathLabels[0] + "/" + this.$refs[ref].getCheckedNodes()[0].pathLabels[1] : this.$refs[ref][0].getCheckedNodes()[0].pathLabels[0] + "/" + this.$refs[ref][0].getCheckedNodes()[0].pathLabels[1];
			hasPipe = ref == "relCascader_line" ? this.$refs[ref].getCheckedNodes()[0].data.hasPipe : this.$refs[ref][0].getCheckedNodes()[0].data.hasPipe;
			directions = ref == "relCascader_line" ? this.$refs[ref].getCheckedNodes()[0].data.directions : this.$refs[ref][0].getCheckedNodes()[0].data.directions;
			directions.map((dir) => {
				if (dir.code == "0") dir.name = "—";
			});
			if (!directions.filter((x) => x.code == "").length && !directions.filter((x) => x.code == "99").length) directions.unshift({ code: "99", name: "无" });
			// if (!directions.filter((x) => x.code == "0").length) directions.unshift({ code: "0", name: "无" });

			if (this.curAnchors.anchorIsEquipment) {
				const idx = ref.split("_")[1];
				this.curAnchors.childNode[idx].relName = relName;
				this.curAnchors.childNode[idx].defaultRelModel = data.defaultRelModel;
				this.curAnchors.childNode[idx].directions = directions;
				this.curAnchors.childNode[idx].directionName = "99";
				this.curAnchors.childNode[idx].hasPipe = hasPipe;
				this.curAnchors.childNode[idx].pipeStepLimited = false;
				this.curAnchors.childNode[idx].pipeRiserLimited = false;

				this.curAnchors.equipments[idx].relName = relName;
				this.curAnchors.equipments[idx].defaultRelModel = data.defaultRelModel;
				this.curAnchors.equipments[idx].directions = directions;
				this.curAnchors.equipments[idx].directionName = "99";
				this.curAnchors.equipments[idx].hasPipe = hasPipe;
				this.curAnchors.equipments[idx].pipeStepLimited = false;
				this.curAnchors.equipments[idx].pipeRiserLimited = false;
			} else {
				const idx = ref.split("_")[1];
				this.curAnchors.relName = relName;
				this.curAnchors.defaultRelModel = data.defaultRelModel;
				this.curAnchors.directions = directions;
				this.curAnchors.directionName = "99";
				this.curAnchors.hasPipe = hasPipe;
				this.curAnchors.pipeStepLimited = false;
				this.curAnchors.pipeRiserLimited = false;

				if (this.curAnchors.objectType != "line") {
					this.curAnchors.equipments[idx].relName = relName;
					this.curAnchors.equipments[idx].defaultRelModel = data.defaultRelModel;
					this.curAnchors.equipments[idx].directions = directions;
					this.curAnchors.equipments[idx].directionName = "99";
					this.curAnchors.equipments[idx].hasPipe = hasPipe;
					this.curAnchors.equipments[idx].pipeStepLimited = false;
					this.curAnchors.equipments[idx].pipeRiserLimited = false;

					if (this.curAnchors.childNode) {
						this.curAnchors.childNode[idx].relName = relName;
						this.curAnchors.childNode[idx].defaultRelModel = data.defaultRelModel;
						this.curAnchors.childNode[idx].directions = directions;
						this.curAnchors.childNode[idx].directionName = "99";
						this.curAnchors.childNode[idx].hasPipe = hasPipe;
						this.curAnchors.childNode[idx].pipeStepLimited = false;
						this.curAnchors.childNode[idx].pipeRiserLimited = false;
					} else {
						this.curAnchors.childNode = _.cloneDeep(this.curAnchors.equipments);
					}
				}
			}

			// TODO 使用 data 循环
			this.connectTreeList = this.connectTreeList.map((item) => {
				if (item.childNode == undefined) item.childNode = [];

				if (item.objectType == "line" && item.key == data.key) {
					this.equipments.map((element) => {
						for (let i = 0; i < element.allEquip.length; i++) {
							if (element.allEquip[i].key == data.key) {
								element.allEquip[i] = _.cloneDeep(this.curAnchors);
								item = _.cloneDeep(this.curAnchors);
							}
						}
					});
				}
				if (item.containerId == this.curAnchors.key || (item.id == this.curAnchors.fatherId && item.id != undefined)) {
					let flag = false;
					item.childNode.map((child) => {
						if (child.code == this.curAnchors.code && this.curAnchors.code != undefined) {
							if (child.anchorIsEquipment) {
								child.childNode.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.relName = relName;
										x.defaultRelModel = data.defaultRelModel;
										x.directions = directions;
										x.hasPipe = hasPipe;
										x.pipeStepLimited = false;
										x.pipeRiserLimited = false;
									}
								});
								child.equipments.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.relName = relName;
										x.defaultRelModel = data.defaultRelModel;
										x.directions = directions;
										x.hasPipe = hasPipe;
										x.pipeStepLimited = false;
										x.pipeRiserLimited = false;
									}
								});
							} else {
								child = _.merge(child, this.curAnchors);
							}
							flag = true;
						}
					});

					if (!flag) item.childNode.push(_.cloneDeep(this.curAnchors));

					this.equipments.map((element) => {
						if (element.containerId === id || element.id === id || id.length === 0) {
							for (let i = 0; i < element.allEquip.length; i++) {
								if (element.allEquip[i].key == item.key) {
									element.allEquip[i].childNode = item.childNode;
									element.allEquip[i].equipments = item.childNode;
								}
							}
						}
					});
				}
				return item;
			});
		},
		changeDirection(value, directions, idx, data) {
			const id = this.checkedMainObject.name;
			const direction = directions.filter((x) => x.code == value)[0] || data.directionName;

			if (this.curAnchors.anchorIsEquipment) {
				this.curAnchors.childNode[idx].direction = direction;
				this.curAnchors.equipments[idx].direction = direction;
			} else {
				this.curAnchors.direction = direction;
				if (this.curAnchors.objectType != "line") {
					if (this.curAnchors.childNode) this.curAnchors.childNode[idx].direction = direction;
					this.curAnchors.equipments[idx].direction = direction;
				}
			}

			// TODO 使用 data 循环
			this.connectTreeList = this.connectTreeList.map((item) => {
				if (item.childNode == undefined) item.childNode = [];

				if (item.objectType == "line" && item.key == data.key) {
					this.equipments.map((element) => {
						for (let i = 0; i < element.allEquip.length; i++) {
							if (element.allEquip[i].key == data.key) {
								element.allEquip[i] = _.cloneDeep(this.curAnchors);
								item = _.cloneDeep(this.curAnchors);
							}
						}
					});
				}
				if (item.containerId == this.curAnchors.key || (item.id == this.curAnchors.fatherId && item.id != undefined)) {
					let flag = false;
					item.childNode.map((child) => {
						if (child.code == this.curAnchors.code && this.curAnchors.code != undefined) {
							if (child.anchorIsEquipment) {
								child.childNode.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.direction = direction;
										x.directionName = direction.code;
									}
								});
								child.equipments.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.direction = direction;
										x.directionName = direction.code;
									}
								});
							} else {
								child = _.merge(child, this.curAnchors);
							}
							flag = true;
						}
						if (child.objectType == "pipe") {
							if (child.id == this.curAnchors.id && this.curAnchors.id != undefined) {
								child = _.merge(child, this.curAnchors);
								flag = true;
							}
						}
					});

					// if (!flag) item.childNode.push(_.cloneDeep(this.curAnchors));
					if (!flag) {
						if (item.key == this.curAnchors.key && this.curAnchors.key != undefined) {
							item.childNode = _.merge(item.childNode, this.curAnchors);
						} else {
							item.childNode.push(_.cloneDeep(this.curAnchors));
						}
					}

					this.equipments.map((element) => {
						if (element.containerId === id || element.id === id || id.length === 0) {
							for (let i = 0; i < element.allEquip.length; i++) {
								if (element.allEquip[i].key == item.key) {
									element.allEquip[i].childNode = item.childNode;
									element.allEquip[i].equipments = item.childNode;
								}
							}
						}
					});
				}
				return item;
			});
		},
		changeStepOrRiser(idx, data) {
			this.$forceUpdate();
			const id = this.checkedMainObject.name;
			let pipeStepLimited = data.pipeStepLimited;
			let pipeRiserLimited = data.pipeRiserLimited;

			if (this.curAnchors.anchorIsEquipment) {
				this.curAnchors.childNode[idx].pipeStepLimited = pipeStepLimited;
				this.curAnchors.equipments[idx].pipeStepLimited = pipeStepLimited;

				this.curAnchors.childNode[idx].pipeRiserLimited = pipeRiserLimited;
				this.curAnchors.equipments[idx].pipeRiserLimited = pipeRiserLimited;
			} else {
				this.curAnchors.pipeStepLimited = pipeStepLimited;
				this.curAnchors.pipeRiserLimited = pipeRiserLimited;

				if (this.curAnchors.objectType != "line") {
					if (this.curAnchors.childNode) {
						this.curAnchors.childNode[idx].pipeStepLimited = pipeStepLimited;
						this.curAnchors.childNode[idx].pipeRiserLimited = pipeRiserLimited;
					}
					this.curAnchors.equipments[idx].pipeStepLimited = pipeStepLimited;
					this.curAnchors.equipments[idx].pipeRiserLimited = pipeRiserLimited;
				}
			}

			this.connectTreeList = this.connectTreeList.map((item) => {
				if (item.childNode == undefined) item.childNode = [];

				if (item.objectType == "line" && item.key == data.key) {
					this.equipments.map((element) => {
						for (let i = 0; i < element.allEquip.length; i++) {
							if (element.allEquip[i].key == data.key) {
								element.allEquip[i] = _.cloneDeep(this.curAnchors);
								item = _.cloneDeep(this.curAnchors);
							}
						}
					});
				}
				if (item.containerId == this.curAnchors.key || (item.id == this.curAnchors.fatherId && item.id != undefined)) {
					let flag = false;
					item.childNode.map((child) => {
						if (child.code == this.curAnchors.code && this.curAnchors.code != undefined) {
							if (child.anchorIsEquipment) {
								child.childNode.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.pipeStepLimited = pipeStepLimited;
										x.pipeRiserLimited = pipeRiserLimited;
									}
								});
								child.equipments.map((x) => {
									if (data.containerId == x.containerId && data.id == x.id) {
										x.pipeStepLimited = pipeStepLimited;
										x.pipeRiserLimited = pipeRiserLimited;
									}
								});
							} else {
								child = _.merge(child, this.curAnchors);
							}
							flag = true;
						}
						if (child.objectType == "pipe") {
							if (child.id == this.curAnchors.id && this.curAnchors.id != undefined) {
								child = _.merge(child, this.curAnchors);
								flag = true;
							}
						}
					});

					// if (!flag) item.childNode.push(_.cloneDeep(this.curAnchors));
					if (!flag) {
						if (item.key == this.curAnchors.key && this.curAnchors.key != undefined) {
							item.childNode = _.merge(item.childNode, this.curAnchors);
						} else {
							item.childNode.push(_.cloneDeep(this.curAnchors));
						}
					}

					this.equipments.map((element) => {
						if (element.containerId === id || element.id === id || id.length === 0) {
							for (let i = 0; i < element.allEquip.length; i++) {
								if (element.allEquip[i].key == item.key) {
									element.allEquip[i].childNode = item.childNode;
									element.allEquip[i].equipments = item.childNode;
								}
							}
						}
					});
				}
				return item;
			});
		},
		changeRiser() {},
		changeTreeRootNode(oneIndex, data) {
			for (let i = 0; i < this.connectTreeList.length; i++) {
				if (this.connectTreeList[i].selected) {
					this.connectTreeList[i].selected = false;
				}
				if (this.connectTreeList[i].childNode) {
					for (let j = 0; j < this.connectTreeList[i].childNode.length; j++) {
						if (this.connectTreeList[i].childNode[j].selected) {
							this.connectTreeList[i].childNode[j].selected = false;
						}
					}
				}
			}

			this.connectTreeList[oneIndex].selected = true;

			this.curHeight = data.path;
			if ((this.connectEquipObject.containerId == data.containerId && data.containerId != undefined) || (this.connectEquipObject.id == data.id && data.id != undefined)) return;
			this.checkedAnchors = [];
			this.curAnchors = {};
			this.connectEquipObject = _.cloneDeep(data);
			this.checkedSubObject.name = "";

			if (data.objectType == "line") {
				if (!data.defaultRelModel) data.defaultRelModel = [];
				this.curAnchors = _.cloneDeep(data);
				this.subTabsChange(this.curAnchors);
			}
		},
		changeTreeRootNodeTwo([oneIndex, twoIndex], obj) {
			for (let i = 0; i < this.connectTreeList.length; i++) {
				if (this.connectTreeList[i].selected) {
					this.connectTreeList[i].selected = false;
				}
				if (this.connectTreeList[i].childNode) {
					for (let j = 0; j < this.connectTreeList[i].childNode.length; j++) {
						if (this.connectTreeList[i].childNode[j].selected) {
							this.connectTreeList[i].childNode[j].selected = false;
						}
					}
				}
			}

			this.connectTreeList[oneIndex].childNode[twoIndex].selected = true;

			this.curHeight = obj.path;
			let list = this.$options.filters["formatTree"](this.connectTreeList);
			let data = {};
			for (let i = 0; i < list.length; i++) {
				if (list[i].objectType === "pipe") {
					for (let pIndex = 0; pIndex < list[i].childNode.length; pIndex++) {
						if (list[i].childNode[pIndex].id === obj.id) {
							data = list[i];
						}
					}
				} else if (list[i].key === obj.key) {
					data = list[i];
				}
			}

			this.connectEquipObject = _.cloneDeep(data);
			this.curAnchors = data;
			this.checkedSubObject.name = obj.code ? obj.code : obj.id;
			if (obj.objectType === "pipe") {
				this.$nextTick(() => {
					setTimeout(() => {
						console.error(this.checkedAnchors);
						// this.curAnchors = _.cloneDeep(obj);
						for (let i = 0; i < this.checkedAnchors.length; i++) {
							if (this.checkedAnchors[i].id === obj.id) {
								this.curHeight = data.path;
								this.subTabsChange({ name: this.checkedAnchors[i].id });
								this.checkedAnchors = JSON.parse(JSON.stringify(this.connectEquipObject.childNode));
								return;
							}
						}
					}, 200);
				});
			} else {
				this.subTabsChange(this.checkedSubObject);
			}
		},
		changeTreeChildNode(node, data) {
			this.curHeight = data.path;
		},

		getConnectAnchor(anchors, marker) {
			let anchorArr = this.checkedAnchors.length ? this.checkedAnchors : _.merge([], anchors);
			anchorArr.map((item) => {
				item.checked = false;
			});
			anchorArr = _.merge(anchorArr, anchors);
			this.checkedAnchors = anchorArr;
			if (marker != undefined && !marker.checked) {
				this.equipment.map((item) => {
					// TUDO
				});
			}
			if (marker?.anchorCode) {
				this.checkedSubObject.name = marker.anchorCode;
				this.subTabsChange({ name: marker.anchorCode });
			}
		},

		async getMainAnchor(anchor) {
			if (this.connectTreeList.length != 0 && JSON.stringify(this.mainAnchor) != "{}") {
				const state = await this.$msgbox
					.confirm("锚点数据还未保存，是否保存?", {
						confirmButtonText: "保存",
						cancelButtonText: "关闭",
						type: "warning",
					})
					.catch(() => {});
				if (state == "confirm") {
					this.switchSave = true;
					await this.save();
				} else if (state == undefined) {
					this.switchSaveState = true;
				}

				if (this.switchSaveState) {
					await this.getMainAnchorInfo(anchor);
				} else {
					if (this.mainObjectType == "equipment") this.$refs["legendChoose"].setInitAnchorState(this.mainAnchor);
				}
			} else {
				this.getMainAnchorInfo(anchor);
			}
		},
		async getMainAnchorInfo(anchor) {
			const self = this;
			if (JSON.stringify(this.mainAnchor) != "{}" && this.anchorIsEquipment) {
				if (!this.equipments.length && this.mainAnchor != anchor) {
					this.$message({
						message: "动态锚点 " + this.mainAnchor.code + " 未配置设备哦",
						type: "warning",
					});
				}
			}

			this.mainAnchor = anchor;
			this.connectTreeList = [];
			this.checkedMainObject.name = "";
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});

			if (this.mainObjectType == "equipment") {
				const params = {
					operate: "anchor-detail",
					templateId: anchor.templateId,
					containerId: anchor.containerId,
					anchorCode: anchor.anchorCode,
				};
				await GetAdmData.getAnchorDetail(params).then((result) => {
					if (result.result == "success") {
						if (result.data.anchorDetail.multiple) {
							const anchorCode = this.mainAnchor.anchorCode;
							if (this.mainEquipObject.objectType == "equipment") {
								this.mainEquipObject.legend.legendContent.anchors.map((x) => {
									if (x.code == anchorCode) {
										x.multiple = true;
										x.checked = true;
									}
								});
							}
						}

						this.anchorIsMultiple = result.data.anchorDetail.multiple;
						this.anchorIsEquipment = result.data.anchorDetail.equipment;
						this.equipments = result.data.anchorDetail.equipment ? result.data.anchorDetail.equipments : [];

						// 如果不配设备类  那么将主设备放入配设备列表
						if (!result.data.anchorDetail.equipment) {
							this.equipments = [_.cloneDeep(this.mainEquipObject)];
						}
					}
				});

				if (this.checkedMainObject.name == "0" && this.anchorIsEquipment) this.checkedMainObject.name = "";
				this.checkedAnchors = [];
				this.curAnchors = {};
				this.connectEquipObject = {};
				this.checkedSubObject.name = "";
			} else {
				this.anchorIsMultiple = false;
				this.anchorIsEquipment = false;
				this.equipments = [_.cloneDeep(this.mainEquipObject)];
			}

			const params = { templateId: this.$route.query.templateid, operate: "line-tree-two" };
			if (this.mainObjectType == "pipe" || this.mainObjectType == "line") {
				params["mainPipeId"] = anchor.id;
				await this.format_LineTreeList(params);
			} else if (!this.anchorIsEquipment) {
				params["containerId"] = anchor.containerId;
				params["anchorCode"] = anchor.anchorCode;
				await this.format_LineTreeList(params);
			} else {
				await Promise.all(
					this.equipments.map(async function (item) {
						const params = {
							templateId: self.$route.query.templateid,
							operate: "line-tree-two",
							containerId: self.mainAnchor.containerId,
							anchorCode: self.mainAnchor.anchorCode,
							anchorEquipmentId: item.id,
						};
						await self.format_LineTreeList(params, item.id);
					})
				);
			}

			this.$loading().close();
		},
		async format_LineTreeList(params, equipId) {
			const self = this;
			const { result, data } = await GetAdmData.getAnchorsTexts(params);
			if (result == "success") {
				let tree = [];
				let lineTreeList = data.lineTreeList;
				if (lineTreeList && lineTreeList.length) {
					await Promise.all(
						lineTreeList.map(async function (container) {
							let obj = _.cloneDeep(self.allEquipList.filter((x) => x.key == container.containerId));
							if (obj.length) {
								let root = _.cloneDeep(obj[0]);

								root.childNode = [];
								root.checked = true;

								if (root.objectType == "line") {
									let direct = container.children.find((x) => x.nodeType == "direct");
									let indirect = container.children.find((x) => x.nodeType == "indirect");

									root.lineId = direct?.line?.id;
									root.indirectLineId = indirect?.line?.id;
									root.line = direct?.line;
									root.indirectLine = indirect?.line;
									root.relClassCodeList = [];
									root.relName = direct ? direct.line.relTypeList[0].name : "";
									root.defaultRelModel = direct ? direct.line.relTypeList[0].code.split("/") : [];
									root.relChain = direct?.line?.relChainFilter;

									root.directionName = direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].direction : "";
									root.pipeStepLimited = direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeStepLimited : false;
									root.pipeRiserLimited = direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeRiserLimited : false;

									root.relIndirectName = indirect ? "间接关系" : "";
									root.relIndirectChain = indirect ? indirect?.line.relChainFilter : [];

									root.bbbbbbbbbbbb = "bbbbbbbbbbbbbbbb";
								} else if (container.nodeType != "riser" && container.children.length) {
									await Promise.all(
										container.children.map(async function (anchor) {
											let root1 = _.cloneDeep(obj[0]);
											let direct = anchor.children.find((x) => x.nodeType == "direct");
											let indirect = anchor.children.find((x) => x.nodeType == "indirect");

											const param = {
												operate: "anchor-detail",
												templateId: self.$route.query.templateid,
												containerId: anchor.containerId,
												anchorCode: anchor.anchorCode,
											};
											const { result, data } = await GetAdmData.getAnchorDetail(param);

											let var1 = {
												lineId: direct?.line?.id,
												indirectLineId: indirect?.line?.id,
												code: anchor?.anchorCode,
												typeName: anchor.name,
												containerId: anchor.containerId || anchor?.line?.containerId,
												multiple: data?.anchorDetail?.multiple,
												checked: true,
												visible: true,
												locked: false,
												anchorCode: anchor.anchorCode,
												equipment: data?.anchorDetail?.equipment,
												key: root.containerId,
												anchorIsMultiple: data?.anchorDetail.multiple,
												anchorIsEquipment: data?.anchorDetail.equipment,
												defaultRelModel: direct ? direct.line.relTypeList[0].code.split("/") : [],
												relClassCodeList: [],
												relName: direct ? direct.line.relTypeList[0].name : "",
												equipments: [],
												line: direct?.line,
												indirectLine: indirect?.line,
												direction: "",
												relChain: direct?.line?.relChainFilter,
												pipeStepLimited: direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeStepLimited : false,
												pipeRiserLimited: direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeRiserLimited : false,

												relIndirectName: indirect ? "间接关系" : "",
												relIndirectChain: indirect ? indirect?.line.relChainFilter : [],
											};

											if (!data.anchorDetail.equipment) data.anchorDetail.equipments = [];
											if (!data.anchorDetail.equipment) {
												root1.defaultRelModel = direct ? direct.line.relTypeList[0].code.split("/") : [];
												(root1.pipeStepLimited = direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeStepLimited : false), (root1.pipeRiserLimited = direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeRiserLimited : false), (root1.line = anchor?.line);
												root1.relChain = direct?.line?.relChainFilter;
												root1.line = direct?.line;
												root1.indirectLine = indirect?.line;
												root1.relIndirectName = indirect ? "间接关系" : "";
												root1.relIndirectChain = indirect ? indirect?.line.relChainFilter : [];

												var1.equipments.push(root1);
											} else {
												var1.equipments = data.anchorDetail.equipments;
												var1.equipments.map((x) => {
													if (x.containerId == anchor.containerId) {
														direct = y.children.find((x) => x.nodeType == "direct");
														x.defaultRelModel = direct ? direct.line.relTypeList[0].code.split("/") : [];
													}
													if (!x.containerId || x.containerId == undefined) x.containerId = anchor.containerId || anchor?.line?.containerId;
													if (anchor.children && anchor.children.length) {
														anchor.children.map((y) => {
															if (x.id == y.anchorEquipmentId) {
																direct = y.children.find((x) => x.nodeType == "direct");
																indirect = y.children.find((x) => x.nodeType == "indirect");

																x.defaultRelModel = direct ? direct.line.relTypeList[0].code.split("/") : [];
																x.relName = direct ? direct.line.relTypeList[0].name : "";
																x.lineId = direct?.line?.id;
																x.indirectLineId = indirect?.line?.id;
																x.line = direct?.line;
																x.indirectLine = indirect?.line;
																x.relChain = direct?.line?.relChainFilter;
																x.pipeStepLimited = direct?.line?.relTypeList?.length == 1 ? direct?.line?.relTypeList[0].pipeStepLimited : false;
																x.pipeRiserLimited = direct?.line?.relTypeList?.length == 1 ? direct?.line?.relTypeList[0].pipeRiserLimited : false;

																x.relIndirectName = indirect ? "间接关系" : "";
																x.relIndirectChain = indirect ? indirect?.line.relChainFilter : [];
															}
														});
													}
												});
											}

											await Promise.all(
												var1.equipments.map(async function (x) {
													const rel = await self.getRelFromToClassCode(x, x.line);
													rel.forEach((item) => {
														item["label"] = item.name;
														item["value"] = item.graphCode;

														item.children.forEach((child) => {
															child["label"] = child.name;
															child["value"] = child.relCode;
														});
													});

													x.relClassCodeList = rel;

													if (x.defaultRelModel && x.defaultRelModel.length) {
														rel.forEach((t) => {
															if (t.value == x.defaultRelModel[0]) {
																t.children.forEach((b) => {
																	b.directions.map((dir) => {
																		if (dir.code == "0") dir.name = "—";
																	});
																	if (!b.directions.filter((x) => x.code == "").length) b.directions.unshift({ code: "99", name: "无" });
																	if (b.value == x.defaultRelModel[1]) {
																		x.directions = b.directions;
																		x.direction = b.directions.filter((dir) => dir.code == x.line.relTypeList[0].direction)[0];
																		x.directionName = x?.line?.relTypeList?.length == 1 ? (x?.line?.relTypeList[0].direction ? x?.line?.relTypeList[0].direction : "99") : "";
																		x.hasPipe = b.hasPipe;
																	}
																});
															}
														});
													}
													x.xxxxxxxxxxxxxx = "sssssssssssssssssssssss";
												})
											);

											if (anchor.children && anchor.children.length) {
												var1.childNode = var1.equipments;
											}

											root.childNode.push(var1);
										})
									);
								} else if (container.nodeType == "riser") {
									let root1 = _.cloneDeep(obj[0]);
									let var1 = {
										...root1,
										typeName: container.name,
										containerId: container.containerId,
										checked: true,
										equipments: [],
									};

									let lines = [];

									container.children.map(async function (pipe) {
										root1.children.map((x) => {
											if (x.classCode == pipe.classCode) {
												let direct = pipe.children.find((x) => x.nodeType == "direct");
												let indirect = pipe.children.find((x) => x.nodeType == "indirect");
												lines.push({
													...x,
													...pipe,
													lineId: direct?.line?.id,
													indirectLineId: indirect?.line?.id,
													line: direct?.line,
													indirectLine: indirect?.line,
													relChain: direct?.line?.relChainFilter,
													checked: true,
													typeName: pipe.name,
													defaultRelModel: direct ? direct.line.relTypeList[0].code.split("/") : [],
													relName: direct ? direct.line.relTypeList[0].name : "",
													pipeStepLimited: direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeStepLimited : false,
													pipeRiserLimited: direct?.line?.relTypeList?.length == 1 ? direct.line.relTypeList[0].pipeRiserLimited : false,

													relIndirectName: indirect ? "间接关系" : "",
													relIndirectChain: indirect ? indirect?.line.relChainFilter : [],
												});
											}
										});
									});

									await Promise.all(
										lines.map(async function (x) {
											const rel = await self.getRelFromToClassCode(x, x.line);

											rel.forEach((item) => {
												item["label"] = item.name;
												item["value"] = item.graphCode;

												item.children.forEach((child) => {
													child["label"] = child.name;
													child["value"] = child.relCode;
												});
											});
											x.relClassCodeList = rel;

											if (x.defaultRelModel && x.defaultRelModel.length) {
												rel.forEach((t) => {
													if (t.value == x.defaultRelModel[0]) {
														t.children.forEach((b) => {
															b.directions.map((dir) => {
																if (dir.code == "0") dir.name = "—";
															});
															if (!b.directions.filter((x) => x.code == "").length) b.directions.unshift({ code: "99", name: "无" });
															if (b.value == x.defaultRelModel[1]) {
																x.directions = b.directions;
																x.direction = b.directions.filter((dir) => dir.code == x.line.relTypeList[0].direction)[0];
																x.directionName = x?.line?.relTypeList?.length == 1 ? (x?.line?.relTypeList[0].direction ? x?.line?.relTypeList[0].direction : "99") : "";
																x.hasPipe = b.hasPipe;
															}
														});
													}
												});
											}

											const temp = _.cloneDeep(x);
											x.equipments = [temp];
										})
									);

									root.childNode = lines;
								}

								self.equipList = _.cloneDeep(self.allEquipList);
								tree.push(root);
							}
						})
					);

					// 上边目前是针对静态锚点做的操作   动态的话  equipments 是数组  不能这样写

					if (self.checkedMainObject.name == "") {
						self.connectTreeList = tree;

						self.equipments.map((item) => {
							if (!item["allEquip"]) item["allEquip"] = _.cloneDeep(self.equipList);
							tree.map((line) => {
								if (line.objectType == "line") {
									for (let i = 0; i < item.allEquip.length; i++) {
										if (item.allEquip[i].id == line.id) {
											item.allEquip[i] = _.cloneDeep(line);
										}
									}
								} else {
									item.allEquip.map((eq) => {
										if (self.anchorIsEquipment && item.id == equipId) {
											if ((eq.key == line.containerId && eq.key != undefined) || (eq.id == line.id && eq.id != undefined)) {
												eq.checked = true;
												eq.childNode = line.childNode;
											}
										} else if (!self.anchorIsEquipment) {
											if ((eq.key == line.containerId && eq.key != undefined) || (eq.id == line.id && eq.id != undefined)) {
												eq.checked = true;
												eq.childNode = line.childNode;
											}
										}
									});
								}
							});
							return item;
						});
					} else {
						self.equipments.map((item) => {
							if (!item.allEquip) item.allEquip = _.cloneDeep(self.allEquipList);
							lineTreeList.map((line) => {
								item.allEquip.map((eq) => {
									if (eq.key == line.containerId && item.id == equipId) {
										eq.checked = true;
									}
								});
							});
							if (item.id == equipId) {
								item.allEquip.map((x) => {
									tree &&
										tree.map((y) => {
											if (x.key == y.key) {
												x.childNode = _.cloneDeep(y.childNode);
											}
										});
								});
							}
							// item.childNode = item.id == equipId ? tree : [];
						});
					}
				}
			}
		},
		async getLinesCount() {
			let count = 0;
			const params = { templateId: this.$route.query.templateid, operate: "line-tree-two" };
			if (this.mainObjectType == "pipe" || this.mainObjectType == "line") {
				params["mainPipeId"] = this.mainAnchor.id;
				const { result, data } = await GetAdmData.getAnchorsTexts(params);
				count = data.lineTreeList?.length;
			} else if (!this.anchorIsEquipment) {
				params["containerId"] = this.mainAnchor.containerId;
				params["anchorCode"] = this.mainAnchor.anchorCode;
				const { result, data } = await GetAdmData.getAnchorsTexts(params);
				count = data.lineTreeList?.length;
			} else {
				await Promise.all(
					this.equipments.map(async function (item) {
						const params = {
							templateId: self.$route.query.templateid,
							operate: "line-tree-two",
							containerId: self.mainAnchor.containerId,
							anchorCode: self.mainAnchor.anchorCode,
							anchorEquipmentId: item.id,
						};
						const { result, data } = await GetAdmData.getAnchorsTexts(params);
						count += data.lineTreeList?.length;
					})
				);
			}

			if (count == 0) {
				if (this.mainObjectType == "equipment") this.$refs.legendChoose.setAnchorRestor(this.mainAnchor);
				if (this.mainObjectType == "pipe") this.$refs.standPipeChoose.setPipeRestore(this.mainAnchor);
			}
		},
		getCircularReplacer() {
			const seen = new WeakSet();
			return (key, value) => {
				if (typeof value === "object" && value !== null) {
					if (seen.has(value)) {
						return;
					}
					seen.add(value);
				}
				return value;
			};
		},

		getAddAnchorEquipment(data) {
			const params = {
				operate: "anchor-detail",
				templateId: this.mainAnchor.templateId,
				containerId: this.mainAnchor.containerId,
				anchorCode: this.mainAnchor.anchorCode,
			};
			GetAdmData.getAnchorDetail(params).then((result) => {
				if (result.result == "success") {
					let list = result.data.anchorDetail.equipments;
					list.map((item) => {
						item.allEquip = [];
						let eq = this.equipments.filter((x) => x.id == item.id);
						if (eq.length) {
							item.allEquip = eq[0].allEquip;
						}
					});
					this.equipments = list;
				}
			});
		},
		// 查询设备锚点联线
		async getAnchorsTexts(params) {
			await GetAdmData.getAnchorsTexts(params).then((result) => {
				if (result.result == "success") {
					this.mainEquipObject = {
						...this.mainEquipObject,
						...this.mainAnchorTextObject,
						...result.data,
					};
				}
			});
		},
		async settleData(value) {
			const self = this;
			let list = value?.list || [];
			let mList = value?.mainPipesList || [];
			let mLineList = value?.mainLineList || [];
			let eqs = [];

			list.forEach((item) => {
				eqs.push({
					templateId: this.$route.query.templateid,
					operate: "text-line",
					containerId: item.id,
					key: item.id,
					classCode: item.classCodes[0],
					name: item.name,
					anchors: [],
					childNode: [],
					checked: false,
					objectType: item.typeCode == "group" && item.groupCode == "equipment" ? "equipment" : item.typeCode,
					groupCode: item.groupCode,
					typeCode: item.typeCode,
				});
			});

			mLineList.forEach((item) => {
				eqs.push({
					templateId: this.$route.query.templateid,
					operate: "text-line",
					key: item.id,
					id: item.id,
					classCode: item.equipmentTypes[item.equipmentTypes.length - 1],
					equipmentTypes: item.equipmentTypes,
					name: item.name,
					anchors: [],
					childNode: [],
					objectType: "line",
					multiple: false,
					relClassCodeList: [],
				});
			});

			await Promise.all(
				mList.map(async function (item) {
					item.objectType = "pipe";
					item.checked = false;
					item.childNode = [];
					item.key = item.id;
					item.children.map(async function (child) {
						child.objectType = "pipe";
						child.classCode = child.equipmentTypes[0];

						const params = {
							templateId: self.$route.query.templateid,
							operate: "pipe-line",
							mainPipeId: child.id,
							key: child.id,
						};

						const { result, data } = await GetAdmData.getAnchorsTexts(params);
						if (result == "success") {
							child = {
								...child,
								...data,
							};

							if (data.lineList && data.lineList.length) item["pipe_complete"] = true;
						}
					});
					eqs.push(item);
				})
			);

			this.allEquipList = eqs;

			if (this.mainObjectType == "pipe") {
				let main = value.info;
				main.objectType = "pipe";
				main.key = main.id;

				for (let i = 0; i < main.children.length; i++) {
					let item = main.children[i];
					const params = {
						templateId: self.$route.query.templateid,
						operate: "line-tree-two", //"pipe-line",
						mainPipeId: item.id,
					};
					const { result, data } = await GetAdmData.getAnchorsTexts(params);
					if (result == "success") {
						item = {
							...item,
							...data,
							objectType: "pipe",
						};
						item["pipe_complete"] = data.lineTreeList && data.lineTreeList.length ? true : false;
						main.children[i] = item;
					}
				}

				this.mainEquipObject = main;
			} else if (this.mainObjectType == "line") {
				value.info.classCode = value.info.equipmentTypes[value.info.equipmentTypes.length - 1];
				this.mainEquipObject = value.info;
				this.mainAnchor = value.info;

				await this.getMainAnchor(value.info);
			} else {
				// 获取主锚点信息
				const params = {
					templateId: this.$route.query.templateid,
					operate: "text-line",
					containerId: value.info.id,
				};
				if (value.info.typeCode == "group" && value.info.groupCode == "equipment") this.mainEquipObject.objectType = "room";

				this.mainEquipObject["legendName"] = value.info.name;
				this.getAnchorsTexts(params);
			}
		},
		async deleteTreeRootNode(node, data) {
			const id = this.checkedMainObject.name;
			const self = this;
			//接口删除
			let delParams = {
				templateId: this.$route.query.templateid,
				operate: "line_delete",
				lines: [],
			};
			//修改状态
			await Promise.all(
				this.equipments.map(async function (item) {
					if (item.id === id || id.length === 0) {
						for (let i = 0; i < item.allEquip.length; i++) {
							if (item.allEquip[i].key == data.key) {
								item.allEquip[i].checked = false;
								if (item.allEquip[i].objectType == "line") {
									let count = 0;
									delParams["line"] = {
										id: item.allEquip[i].lineId,
									};
									let { result } = await GetAdmData.anchorsModify(delParams);
									if (result == "success") count++;
									delParams["line"] = {
										id: item.allEquip[i].indirectLineId,
									};
									result = await GetAdmData.anchorsModify(delParams);
									if (result == "success") count++;
									if (count) {
										self.$message({
											message: "删除成功",
											type: "success",
										});
									}
									await self.getLinesCount();

									// item.allEquip[i] = _.cloneDeep(this.equipList[i]);
									delete item.allEquip[i].defaultRelModel;
									delete item.allEquip[i].relClassCodeList;
									delete item.allEquip[i].directionName;
									delete item.allEquip[i].directions;
								} else {
									await Promise.all(
										// 接口删除
										item.allEquip[i].childNode.map(async function (childInfo, index) {
											if (childInfo.lineId || childInfo.indirectLineId) {
												let count = 0;
												delParams["line"] = {
													id: childInfo.lineId,
												};
												let { result } = await GetAdmData.anchorsModify(delParams);
												if (result == "success") count++;
												delParams["line"] = {
													id: childInfo.indirectLineId,
												};
												result = await GetAdmData.anchorsModify(delParams);
												if (result == "success") count++;
												if (count) {
													self.$message({
														message: "删除成功",
														type: "success",
													});
												}
												await self.getLinesCount();
											} else if (childInfo.multiple) {
												await Promise.all(
													childInfo.childNode.map(async function (MultipleInfo, index) {
														if (MultipleInfo.lineId || MultipleInfo.indirectLineId) {
															let count = 0;
															delParams["line"] = {
																id: MultipleInfo.lineId,
															};
															let { result } = await GetAdmData.anchorsModify(delParams);
															if (result == "success") count++;
															delParams["line"] = {
																id: MultipleInfo.indirectLineId,
															};
															result = await GetAdmData.anchorsModify(delParams);
															if (result == "success") count++;
															if (count) {
																self.$message({
																	message: "删除成功",
																	type: "success",
																});
															}
															await self.getLinesCount();
														}
													})
												);
											} else {
												self.$message({
													message: "删除成功",
													type: "success",
												});
											}
										})
									);

									item.allEquip[i].childNode = [];
								}
							}
						}
						self.connectTreeList = _.cloneDeep(item.allEquip.filter((x) => x.checked == true));
						self.equipList = item.allEquip;
					}
				})
			);

			// 编辑锚点清空
			if (this.connectEquipObject.key === data.key) {
				this.connectEquipObject = {};
			}
		},
		async deleteTreeRootNodeChildTow(node, data) {
			const id = this.checkedMainObject.name;
			const self = this;
			//接口删除
			let delParams = {
				templateId: this.$route.query.templateid,
				operate: "line_delete",
				containerId: data.key || data.id,
			};
			if (data.objectType == "pipe") {
				delParams.containerId = data.containerId || "";
			}
			//修改状态
			await Promise.all(
				this.equipments.map(async function (item) {
					if (item.id === id || id.length === 0) {
						for (let i = 0; i < item.allEquip.length; i++) {
							// console.error(item.allEquip[i].key, data.key || data.fatherId);
							if (item.allEquip[i].key == (data.fatherId || data.key)) {
								await Promise.all(
									item.allEquip[i].childNode.map(async function (childInfo, index) {
										if (childInfo.code === data.code) {
											childInfo.relName = "";
											childInfo.relChain = [];
											if (childInfo.lineId || childInfo.indirectLineId) {
												let count = 0;
												delParams["line"] = {
													id: childInfo.lineId,
												};
												let { result } = await GetAdmData.anchorsModify(delParams);
												if (result == "success") count++;
												delParams["line"] = {
													id: childInfo.indirectLineId,
												};
												result = await GetAdmData.anchorsModify(delParams);
												if (result == "success") count++;
												if (count) {
													self.$message({
														message: "删除成功",
														type: "success",
													});
												}
												await self.getLinesCount();
											} else {
												self.$message({
													message: "删除成功",
													type: "success",
												});
											}
											item.allEquip[i].childNode.splice(index, 1);
										}
										if (childInfo.objectType === "pipe") {
											if (data.id === childInfo.id) {
												// 接口删除ajax
												if (childInfo.lineId || childInfo.indirectLineId) {
													let count = 0;
													delParams["line"] = {
														id: childInfo.lineId,
													};
													let { result } = await GetAdmData.anchorsModify(delParams);
													if (result == "success") count++;

													delParams["line"] = {
														id: childInfo.indirectLineId,
													};
													result = await GetAdmData.anchorsModify(delParams);
													if (result == "success") count++;
													if (count) {
														self.$message({
															message: "删除成功",
															type: "success",
														});
													}
													await self.getLinesCount();
												}

												item.allEquip[i].childNode.splice(index, 1);
												childInfo.relName = "";
												childInfo.relChain = [];
												childInfo.checked = false;
											}
										}
									})
								);
							}
						}
						self.connectTreeList = _.cloneDeep(item.allEquip.filter((x) => x.checked == true));
						self.equipList = item.allEquip;
					}
				})
			);

			if (this.connectEquipObject.key === (data.fatherId || data.key)) {
				this.checkedAnchors.map((ac, index) => {
					if (data.code === ac.code) {
						ac.checked = false;
						this.connectEquipObject = _.cloneDeep(this.connectTreeList);
					}
				});

				this.connectTreeList.map((item) => {
					if (item.key === (data.fatherId || data.key)) {
						this.connectEquipObject = _.cloneDeep(item);
					}
					if (item.childNode.length === 0) {
						this.connectEquipObject = {};
					}
				});
			}
		},
		async deleteTreeRootNodeChildThree(node, data) {
			const id = this.checkedMainObject.name;
			const self = this;
			//接口删除
			let delParams = {
				templateId: this.$route.query.templateid,
				operate: "line_delete",
				containerId: data.key,
			};

			//修改状态
			await Promise.all(
				this.equipments.map(async function (item) {
					if (item.id === id || id.length === 0) {
						for (let i = 0; i < item.allEquip.length; i++) {
							if (item.allEquip[i].key == (data.containerId || node.key)) {
								await Promise.all(
									item.allEquip[i].childNode.map(async function (childInfo, index) {
										if (childInfo.code === node.code) {
											await Promise.all(
												childInfo.childNode.map(async function (threeInfo, tIndex) {
													if (threeInfo.id === data.id) {
														threeInfo.relName = "";
														threeInfo.relChain = [];
														// 接口删除
														if (threeInfo.lineId || threeInfo.indirectLineId) {
															let count = 0;
															delParams["line"] = {
																id: threeInfo.lineId,
															};
															let { result } = await GetAdmData.anchorsModify(delParams);
															if (result == "success") count++;
															delParams["line"] = {
																id: threeInfo.indirectLineId,
															};
															result = await GetAdmData.anchorsModify(delParams);
															if (result == "success") count++;
															if (count) {
																self.$message({
																	message: "删除成功",
																	type: "success",
																});
															}
															await self.getLinesCount();
														} else {
															self.$message({
																message: "删除成功",
																type: "success",
															});
														}

														// 07 14 删除动态锚点下的某个关系
														threeInfo.relName = "";
														threeInfo.relChain = [];
														threeInfo.defaultRelModel = [];

														// 23.10.18 连接动态锚点无法删除回显
														// threeInfo.name = ''
														threeInfo.relIndirectChain = [];
														threeInfo.relIndirectName = "";
														threeInfo.indirectLine = {};
														// threeInfo.classNames = ''
													}
												})
											);
										}
									})
								);
							}
						}
						self.connectTreeList = _.cloneDeep(item.allEquip.filter((x) => x.checked == true));
						self.equipList = item.allEquip;
					}
				})
			);

			if (this.curAnchors.key === node.key) {
				for (let s = 0; s < this.checkedAnchors.length; s++) {
					if (this.checkedAnchors[s].code === node.code) {
						this.checkedAnchors[s].checked = false;
						this.checkedAnchors[s].defaultRelModel = [];
					}
				}
				if (this.curAnchors.code === node.code) {
					this.curAnchors = {};
				}
			}
		},
	},
	watch: {
		equipObject: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) == "{}" || val == undefined) return;
				this.settleData(val);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.pAnchor {
	position: fixed;
	left: 0;
	right: 0;
	top: 48px;
	bottom: 0;
	background: #fff;
	z-index: 99;
	display: flex;
	flex-direction: column;

	.tle {
		height: 48px;
		width: 100%;
		border-bottom: 1px solid #e1e5eb;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20px;

		.left {
			display: flex;
			align-items: center;
		}

		svg {
			cursor: pointer;
			margin-left: 16px;
			margin-right: 8px;
		}

		.t1 {
			font-family: "Microsoft YaHei UI";
			font-weight: 700;
			font-size: 14px;
			color: #1b2129;
		}

		.t2 {
			margin: 0 8px 0 8px;
			color: #c4c9cf;
			font-weight: 400;
			font-size: 14px;
		}

		.t3 {
			color: #626c78;
			font-weight: 400;
			font-size: 14px;
		}
	}

	.cnt {
		flex: 1;
		display: flex;
		flex-direction: row;
		padding: 8px 16px 16px 16px;
		background: rgba(217, 217, 217, 0.1);
		height: 0;

		.noMore {
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: #626c78;
			line-height: 22px;
			margin-top: -100px;

			p {
				padding-top: 10px;
			}
		}

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			margin-bottom: 10px;

			.name {
				padding-left: 5px;
				border-left: 2px solid #246fe5;
				font-weight: 700;
				color: #2e3742;
				font-family: "Microsoft YaHei UI";
			}
		}

		.lft {
			width: 358px;
			background: #ffffff;
			padding: 12px 16px 16px 16px;
			display: flex;
			flex-direction: column;

			.chartBox {
				background: #f7f9fa;
				border-radius: 8px;
				display: flex;
				height: 430px;
				margin: 10px 0;
				position: relative;
			}

			.prompt {
				position: absolute;
				width: 298px;
				height: 34px;
				left: 12px;
				bottom: 10px;
				background: #ffffff;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.rht {
			width: 366px;
			background: #ffffff;
			padding: 16px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.chartBox {
				width: 334px;
				height: 280px;
				background: #f7f9fa;
				border-radius: 8px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 16px 0;
				overflow: hidden;

				.objName {
					font-family: "Microsoft YaHei UI";
					font-weight: 400;
					color: #626c78;
					position: absolute;
					margin-top: 240px;
				}
			}

			.dt {
				display: flex;
				flex-direction: column;
				flex: 1;
				overflow-y: auto;
				width: 352px;
				padding-right: 8px;

				.dt_eq {
					.eq_xl {
						font-weight: 700;
						font-size: 14px;
						color: #2e3742;
						line-height: 22px;
					}

					.line {
						width: 100%;
						height: 1px;
						border: 1px dashed #e8ecf0;
						margin: 4px 0;
					}

					.eq_name {
						font-size: 14px;
						font-weight: 400;
						line-height: 22px;
						color: #2e3742;
					}

					.eq_type {
						height: 20px;
						display: inline-block;
						background: #d9ebff;
						border-radius: 2px;
						color: #1b4acc;
						font-size: 12px;
						font-weight: 400;
						padding: 0 4px;
						margin: 6px 0;
						line-height: 20px;
					}

					.gx {
						color: #626c78;
						font-family: "Microsoft YaHei UI";
						font-style: normal;
						font-weight: 400;
						font-size: 14px;
						line-height: 22px;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.gx_group {
							min-width: 28px;
							height: 28px;
							background: #e8ecf0;
							border-radius: 4px;
						}
					}

					.gx_c {
						color: #626c78;
						font-family: "Microsoft YaHei UI";
						font-style: normal;
						font-weight: 400;
						font-size: 14px;
						line-height: 22px;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						height: 32px;
					}

					.el-cascader {
						width: 100%;
						margin-top: 4px;
						margin-bottom: 20px;
					}
				}
			}

			.jt {
				.gx {
					color: #626c78;
					font-family: "Microsoft YaHei UI";
					font-style: normal;
					font-weight: 400;
					font-size: 14px;
					line-height: 22px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.gx_c {
					color: #626c78;
					font-family: "Microsoft YaHei UI";
					font-style: normal;
					font-weight: 400;
					font-size: 14px;
					line-height: 22px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 32px;
				}

				.el-cascader {
					width: 100%;
					margin-top: 4px;
					margin-bottom: 20px;
				}
			}
		}

		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			background: #ffffff;
			margin-left: 8px;
			margin-right: 8px;
			padding: 16px 8px;

			.attr {
				display: flex;
				flex-direction: column;
				min-height: 176px;
				border-bottom: 1px solid #e8ecf0;
				padding-left: 8px;

				.cv {
					height: 38px;
					display: flex;
					flex-direction: row;
					padding-left: 8px;
					align-items: center;

					.s1 {
						display: block;
						width: 96px;
						color: #626c78;
						font-family: "Microsoft YaHei UI";
						font-style: normal;
						font-weight: 400;
						font-size: 14px;
						text-align: right;
						margin-right: 10px;
					}
				}

				.filter {
					min-height: 80px;
					background: #f7f9fa;
					border-radius: 4px;
					display: flex;
					flex-direction: column;
					margin: 6px 0 12px 0;
					justify-content: center;

					.cv {
						min-height: 32px;
						height: auto;

						.eq_c {
							flex: 1;
							min-height: 24px;
							display: flex;
							flex-direction: row;
							flex-flow: wrap;

							.eq-o {
								height: 24px;
								background: #e8ecf0;
								border-radius: 12px;
								margin-right: 8px;
								display: flex;
								align-items: center;
								flex-direction: row;
								padding: 0 8px 0 8px;
								margin-bottom: 4px;

								.s_name {
									font-family: "Microsoft YaHei UI";
									font-style: normal;
									font-weight: 400;
									font-size: 14px;
									line-height: 22px;
									color: #2e3742;
									display: block;
									white-space: nowrap;
									padding-right: 8px;
								}

								svg {
									cursor: pointer;
								}
							}
						}
					}
				}
			}

			.equip {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 8px;

				.tle {
					border-bottom-width: 0px;
					height: 54px;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.eq_cnt {
					display: flex;
					flex: 1;
					flex-direction: column;
					padding-left: 8px;

					.tree {
						display: flex;
						flex: 1;
						overflow-y: auto;
						flex-direction: column;

						.highlight {
							background-color: #edf3fd;
						}

						.treeHead {
							display: flex;
							flex-grow: 1;
							justify-content: space-between;
							align-items: center;

							.label {
								font-size: 14px;
								display: flex;
								align-items: center;

								.name {
									color: #1b2129;
									padding-right: 10px;
								}

								.relation {
									padding: 0 5px;
									height: 18px;
									flex-shrink: 0;
									display: flex;
									font-size: 12px;
									color: #1b4acc;
									align-items: center;
									background: #d9ebff;
									border-radius: 2px;
								}

								.count {
									padding: 0 5px;
									height: 18px;
									flex-shrink: 0;
									display: flex;
									font-size: 12px;
									color: #e68600;
									align-items: center;
									background: #fff0cc;
									border-radius: 2px;
								}

								.relation {
									padding: 0 5px;
									height: 18px;
									flex-shrink: 0;
									display: flex;
									font-size: 12px;
									color: #1b4acc;
									align-items: center;
									background: #d9ebff;
									border-radius: 2px;

									&.no {
										background: #edf1f5;
										color: #8b949e;
									}
								}
							}

							.btn {
								display: flex;
								align-items: center;

								.icon {
									padding: 0 5px;
									cursor: pointer;
								}
							}
						}
					}
				}
			}
		}
	}

	::v-deep .el-tabs__content {
		display: none;
	}

	::v-deep .el-tabs__item {
		font-family: "Microsoft YaHei UI";
		font-weight: 400;
		color: #1b2129;
		font-weight: 400;
		font-size: 14px;
	}

	::v-deep .el-tabs__item.is-active {
		font-weight: 700;
		color: #246fe5;
	}

	::v-deep .el-tabs__nav-wrap::after {
		background: #fff;
	}

	::v-deep .el-tree-node__content {
		height: 32px;

		.treeHead {
			height: 100%;
		}
	}

	::v-deep .el-tree-node__content {
		background-color: transparent;
	}
}

.structure {
	display: flex;
	flex-direction: column;
	color: #626c78;

	.icon {
		line-height: 32px;
		width: 20px;
	}

	& > div {
		display: flex;
		flex-direction: column;

		.one-box {
			display: flex;
			justify-content: flex-start;
			height: 32px;
			padding-left: 20px;

			.name {
				flex: 1;
				display: flex;
				cursor: pointer;
				color: #1b2129;
				font-size: 14px;
				line-height: 32px;
				margin-left: 10px;
			}
		}

		.two-tem {
			padding-left: 40px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.two-box {
				display: flex;
				justify-content: flex-start;
				height: 32px;

				& > .name {
					flex: 1;
					display: flex;
					cursor: pointer;
					color: #1b2129;
					font-size: 14px;
					line-height: 32px;
					margin-left: 10px;
				}
			}

			.three-tem {
				padding-left: 40px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				.three-box {
					display: flex;
					justify-content: flex-start;
					height: 32px;

					& > span {
						flex: 1;
						display: flex;
						cursor: pointer;
						color: #1b2129;
						font-size: 14px;
						line-height: 18px;
						line-height: 32px;
					}
				}
			}
		}

		.relation {
			padding: 0 5px;
			height: 18px;
			flex-shrink: 0;
			display: flex;
			font-size: 12px;
			color: #1b4acc;
			align-items: center;
			background: #d9ebff;
			border-radius: 2px;
			margin-left: 8px;
			margin-top: 4px;
			border-radius: 3px;
			height: 22px;
		}

		.el-icon-caret-right {
			line-height: 32px;
		}

		.inRelation {
			color: #00a2a7;
			background: #cbf7f3;
		}
	}
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner svg path {
	stroke: #fff;
}
</style>
