<?php

function api_user_get($request) {
  $user = wp_get_current_user();
  $user_id = $user->ID;

  if($user_id > 0) {
    $user_meta = get_user_meta($user_id);

    $response = array(
      "id" => $user->user_login,
      "name" => $user->display_name,
      "email" => $user->user_email,
      "cep" => $user_meta['cep'][0],
      "street" => $user_meta['street'][0],
      "number" => $user_meta['number'][0],
      "neighborhood" => $user_meta['neighborhood'][0],
      "city" => $user_meta['city'][0],
      "uf" => $user_meta['uf'][0],
    );
  } else {
    $response = new WP_Error('permission', 'Usuário não possui permissão.', array('status' => 401));
  }
  return rest_ensure_response($response);
}

function register_api_user_get() {
  register_rest_route('api', '/user', array(
    array(
      'methods' => WP_REST_Server::READABLE,
      'callback' => 'api_user_get',
    ),
  ));
}

add_action('rest_api_init', 'register_api_user_get');

?>